from django.db import models
from Stores.models import Store, Product
from accounts.models import Buyer,Seller

# Create your models here.
    
# class Cart(models.Model):
#     buyer = models.OneToOneField(Buyer, on_delete=models.CASCADE , related_name="cart")

class CartItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    buyer = models.ForeignKey(Buyer, on_delete=models.CASCADE , related_name="cart_items")
    quantity = models.PositiveIntegerField(default=1)

    # def __str__(self):
    #     return self.product

class Order(models.Model):
    # refcode = models.CharField(max_length=20)
    buyer = models.ForeignKey(Buyer , on_delete=models.CASCADE , related_name="orders")
    total_cost = models.PositiveIntegerField(default=0)
    deliveryaddress = models.TextField()
    order_date = models.DateField(auto_now_add=True)

class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE , related_name="order_items")
    quantity = models.PositiveIntegerField(default=1)

Status = [('N' , 'Not Delivered'),
          ('D' , 'Delivered')]

class SellerOrder(models.Model):
    # refcode = models.CharField(max_length=20)
    store = models.ForeignKey(Store , on_delete=models.CASCADE , related_name="orders")
    buyer = models.ForeignKey(Buyer , on_delete=models.CASCADE , related_name="sellerwise_orders")
    total_cost = models.PositiveIntegerField(default=0)
    deliveryaddress = models.TextField()
    status = models.CharField(max_length=1 , choices=Status , default='N')
    order_date = models.DateField(auto_now_add=True)

class SellerOrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    order = models.ForeignKey(SellerOrder, on_delete=models.CASCADE , related_name="order_items")
    quantity = models.PositiveIntegerField(default=1)

