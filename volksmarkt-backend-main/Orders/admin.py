from django.contrib import admin
from .models import CartItem, Order, OrderItem, SellerOrder, SellerOrderItem
# Register your models here.

admin.site.register(CartItem)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(SellerOrder)
admin.site.register(SellerOrderItem)
