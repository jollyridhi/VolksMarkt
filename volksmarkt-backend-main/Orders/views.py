from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404
from Orders.models import CartItem, Order, OrderItem, SellerOrder, SellerOrderItem
from Stores.models import Store
from accounts.models import Buyer
from Orders.serializers import CartItemSerializer, OrderMiniSerializer, OrderFullSerializer, OrderItemSerializer, SellerOrderSerializer
from rest_framework import generics
from django.core.mail import send_mail
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import datetime
# Create your views here.
# class CartList(generics.ListCreateAPIView):
#     queryset = Cart.objects.all()
#     serializer_class = CartSerializer

# class CartDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Cart.objects.all()
#     serializer_class = CartSerializer

class CartItemList(generics.ListCreateAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer

class CartItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer

# class CurrentBuyerCart(APIView):
#     def get(self, request, format=None):
#         user = request.user
#         if hasattr(user , 'cart'):
#             cart1 = user.cart
#             items = cart1.cartitem_set
#             serializer = CartItemSerializer(items, many=True)
#             return Response(serializer.data)
#         else:
#             return HttpResponse ("<html>login required</html>")
        
class CurrentBuyerCart(APIView):

    def get_object(self, pk):
        try:
            return Buyer.objects.get(pk=pk)
        except Buyer.DoesNotExist:
            raise Http404

    def get(self, request, pk , format=None):
        buyer = self.get_object(pk)
        items = buyer.cart_items
        cost = 0
        for item in items.all():
            cost += item.product.price * item.quantity
        serializer = CartItemSerializer(items, many=True)
        return Response({'items':serializer.data , 'cost':cost})
    
    def post(self, request, pk, format=None):
        buyer = self.get_object(pk)
        data = request.data
        data.update({'buyer':buyer.pk})
        serializer = CartItemSerializer(data=data)
        if serializer.is_valid():
            prod_id = data['product']
            same_items = buyer.cart_items.filter(product_id=prod_id)
            if same_items:
                same_item = same_items.first()
                same_item.quantity = same_item.quantity + data['quantity']
                same_item.save()
                serializer = CartItemSerializer(same_item)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class PlaceOrder(APIView):        
    def post(self, request, pk, format=None):
        buyer = get_object_or_404(Buyer , pk=pk)
        # cartitems = buyer.cart_items
        data = request.data
        if buyer.wallet < data['total_cost']:
            return Response({"msg": "Not enough funds"})
        data.update({'buyer':pk})
        serializer = OrderMiniSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            order = Order.objects.get(id=serializer.data['id'])
            while buyer.cart_items.all():
                store = buyer.cart_items.first().product.store
                seller_order = SellerOrder.objects.create(store=store, buyer=buyer, deliveryaddress=order.deliveryaddress )
                cost = 0
                for item in buyer.cart_items.filter(product__store = store): 
                    prod = item.product
                    cost += prod.price * item.quantity   
                    newstock = prod.quantity - item.quantity            
                    OrderItem.objects.create(product=prod , order=order , quantity=item.quantity)
                    SellerOrderItem.objects.create(product=prod , order=seller_order , quantity=item.quantity)
                    prod.quantity = newstock
                    prod.save()
                    item.delete()
                seller_order.total_cost = cost
                seller_order.save()
                seller = store.seller
                seller.wallet = seller.wallet + cost
                seller.save()
            
            buyer.wallet = buyer.wallet - data['total_cost']
            buyer.save()
            serializer = OrderMiniSerializer(order)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrdersList(APIView):
    def get(self, request, pk , format=None):
        buyer = get_object_or_404(Buyer , pk=pk)
        orders = buyer.orders
        serializer = OrderMiniSerializer(orders, many=True)
        return Response(serializer.data)
    

class OrderDetail(APIView):
    def get(self, request, pk , format=None):
        order = get_object_or_404(Order , pk=pk)
        serializer = OrderFullSerializer(order)
        return Response(serializer.data)
    

class OrderItemDetail(APIView):
    def get(self, request, pk , format=None):
        item = get_object_or_404(OrderItem , pk=pk)
        serializer = OrderItemSerializer(item)
        return Response(serializer.data)
    
class SellerOrdersList(APIView):
    def get(self, request, pk , format=None):
        store = get_object_or_404(Store , pk=pk)
        orders = store.orders
        serializer = SellerOrderSerializer(orders, many=True)
        return Response(serializer.data)