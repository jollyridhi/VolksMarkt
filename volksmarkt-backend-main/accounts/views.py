from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.http import JsonResponse
from .models import Buyer,Seller
from Stores.models import Store
from django.core.mail import send_mail
from django.http import Http404
from .serializers import BuyerSerializer, SellerSerializer
from rest_framework import status

class HomeView(APIView):
     
   permission_classes = (IsAuthenticated, )
   def get(self, request):
       content = {'message': 'Welcome to the JWT Authentication page using React Js and Django!'}
       return Response(content)

@csrf_exempt
def buyer_login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(username=username,password=password)
    if user:
        msg = {
            'isAuthenticated':True,
            'username':user.get_username(),
            'firstName': user.first_name,
            'lastName': user.last_name,
            'id':user.buyer_id.pk,
            'wallet': user.buyer_id.wallet
        }
    else:
        msg = {
            'isAuthenticated':False
        }
    return JsonResponse(msg)

@csrf_exempt
def buyer_register(request):
    first_name = request.POST.get('first_name')
    last_name = request.POST.get('last_name')
    email = request.POST.get('email')
    password = request.POST.get('password')
    address = request.POST.get('address')
    username = str(email)
    try:
        user = User.objects.create_user(
            first_name=first_name,
            last_name=last_name,
            email = email,
            username = username,
            password = password
        )
        buyer = Buyer.objects.create(
            user = user,
            address = address
        )
        msg = {
            'isCreated':True,
            'buyerId': buyer.pk
        }
        email_body = f'''Dear {first_name}
You have been successfully registered as a buyer!
Regards, 
Team volksmarkt.
'''
        send_mail(
        "Welcome to Volksmarkt",
        email_body,
        "volksmarkt.iitk@gmail.com",
        [email],
        fail_silently=False,
    )
    except Exception as exception :
        msg = {
            'isCreated':False,
            'msg':f"Failed to create Buyer due to ${exception}"
        }
    return JsonResponse(msg)

@csrf_exempt
def seller_login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(username=username,password=password)
    if user:
        msg = {
            'isAuthenticated':True,
            'username':user.get_username(),
            'firstName': user.first_name,
            'lastName': user.last_name,
            'id':user.seller_id.pk,
            'shop_id': user.seller_id.store.pk,
            'wallet': user.seller_id.wallet
        }
    else:
        msg = {
            'isAuthenticated':False
        }
    return JsonResponse(msg)

@csrf_exempt
def seller_register(request):
    first_name = request.POST.get('first_name')
    last_name = request.POST.get('last_name')
    shop_name = request.POST.get('shop_name')
    contact = request.POST.get('contact')
    category = request.POST.get('category')
    email = request.POST.get('email')
    password = request.POST.get('password')
    address = request.POST.get('address')
    image = request.FILES['image']
    username = str(email)
    try:
        user = User.objects.create_user(
            first_name=first_name,
            last_name=last_name,
            email = email,
            username = username,
            password = password
        )
        store = Store.objects.create(
            name = shop_name,
            address = address,  
            category  = category,
            contact = contact,
            image = image
        )
        seller = Seller.objects.create(
            user = user,
            address = address,
            store = store
        )
        msg = {
            'isCreated':True,
            'sellerId': seller.pk
        }
        email_body = f'''Dear {first_name}
You have been successfully registered as a seller!
Regards, 
Team volksmarkt.
'''
        send_mail(
        "Welcome to Volksmarkt",
        email_body,
        "volksmarkt.iitk@gmail.com",
        [email],
        fail_silently=False,
    )
    except Exception as exception :
        msg = {
            'isCreated':False,
            'msg':f"Failed to create Seller due to ${exception}"
        }
    return JsonResponse(msg)


class buyer_details(APIView):
    def get_object(self, pk):
        try:
            return Buyer.objects.get(pk=pk)
        except Buyer.DoesNotExist:
            raise Http404
    def get(self, request, pk , format=None):
        buyer = self.get_object(pk)
        serializer = BuyerSerializer(buyer)
        return Response(serializer.data)
    
    def patch(self , request , pk , format=None):
        buyer = self.get_object(pk)
        serializer = BuyerSerializer(buyer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class seller_details(APIView):
    def get_object(self, pk):
        try:
            return Seller.objects.get(pk=pk)
        except Seller.DoesNotExist:
            raise Http404
    def get(self, request, pk , format=None):
        seller = self.get_object(pk)
        serializer = SellerSerializer(seller)
        return Response(serializer.data)
    
    def patch(self , request , pk , format=None):
        seller = self.get_object(pk)
        serializer = SellerSerializer(seller, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
