from django.test import TestCase
from .models import Store, Product
# Create your tests here.

class ProductTest(TestCase):
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
    def test_product_price(self):
        product1 = Product.objects.get(name = "Test Product")
        product2 = Product.objects.get(name = "Test Product 2")
        self.assertEqual(product1.price,0)
        self.assertEqual(product2.price,10)
    