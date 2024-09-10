from django.db import models
from django.contrib.auth.models import User
from Stores.models import Store
class Buyer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name="buyer_id")
    address = models.CharField(max_length=255,default="NULL")
    wallet = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.user.username
    
class Seller(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name="seller_id")
    address = models.CharField(max_length=255,default="NULL")
    store = models.OneToOneField(Store, on_delete=models.CASCADE,related_name= "seller")
    wallet = models.PositiveIntegerField(default=0)
    def __str__(self):
        return self.user.username
    