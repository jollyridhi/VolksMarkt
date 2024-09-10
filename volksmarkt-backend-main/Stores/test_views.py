import json
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse
from .models import Product,Store
from .serializers import ProductSerializer,StoreSerializer

from django.test import TestCase


class test_get_all_products(TestCase):
    def setUp(self):
        Store.objects.create(name="Test Shop",
                            address = "Test Address",
                            contact = "0000000000",
                            category = "Others")
        Product.objects.create(name = "Test Product",
        description = "Test description",
        price = 0,
        store = Store.objects.get(name = "Test Shop"))
        Product.objects.create(name = "Test Product 2",
        description = "Test description 2",
        price = 10,
        store = Store.objects.get(name = "Test Shop"))
        self.client = Client()
    def test_all_products(self):
        response = self.client.get(reverse('productlist'))
        productList = Product.objects.all()
        serializer = ProductSerializer(productList, many=True)
        self.assertEqual(response.data, serializer.data)
