from django.shortcuts import render, get_object_or_404
from Stores.models import Store,Product
from Stores.serializers import StoreSerializer,ProductSerializer
from rest_framework import generics

from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

class StoreList(generics.ListCreateAPIView):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer


class StoreDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer

class StoreWiseProductList(APIView):
    def get_object(self, pk):
        try:
            return Store.objects.get(pk=pk)
        except Store.DoesNotExist:
            raise Http404
        
    def get(self, request, pk, format=None):
        store = self.get_object(pk)
        products = store.products
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    # def post(self, request, pk, format=None):
    #     serializer = ProductSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CategoryWiseStoreList (APIView):
    def get(self, request, cat, format=None):
        try:
            stores = Store.objects.filter(category=cat)
        except Store.DoesNotExist:
            raise Http404
        serializer = StoreSerializer(stores, many=True)
        return Response(serializer.data)