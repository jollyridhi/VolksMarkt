from rest_framework import serializers
from Stores.models import Store, Product
from Stores.serializers import ProductSerializer
from Orders.models import CartItem, Order, OrderItem, SellerOrder, SellerOrderItem

# class CartSerializer(serializers.ModelSerializer):
#     cart_items = serializers.PrimaryKeyRelatedField(many=True, read_only = True)
#     class Meta:
#         model = Cart
#         fields = ['id', 'buyer', 'cartitem_set']

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'buyer' , 'quantity' ]

class OrderMiniSerializer(serializers.ModelSerializer):
    order_items = serializers.PrimaryKeyRelatedField(many=True , read_only=True)
    class Meta:
        model = Order
        fields = ['id', 'buyer', 'total_cost' , 'deliveryaddress' , 'order_date' , 'order_items']

class ProductMiniSerializer(serializers.ModelSerializer):
    store_name = serializers.CharField(source='store.name' , read_only=True)
    class Meta:
        model = Product
        fields = ['name', 'price' , 'store_name' , 'image']

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductMiniSerializer(read_only=True)
    class Meta:
        model = OrderItem
        fields = ['id' , 'product' , 'quantity' , 'order']

class OrderFullSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True)
    class Meta:
        model = Order
        fields = ['id', 'buyer', 'total_cost' , 'deliveryaddress' , 'order_date' , 'order_items']

class SellerOrderItemSerializer(serializers.ModelSerializer):
    product = ProductMiniSerializer(read_only=True)
    class Meta:
        model = SellerOrderItem
        fields = ['id' , 'product' , 'quantity' , 'order']

class SellerOrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True)
    class Meta:
        model = SellerOrder
        fields = ['id', 'buyer', 'total_cost' , 'deliveryaddress' , 'order_date' , 'order_items']