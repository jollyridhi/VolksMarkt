from django.db import models
from django.core.validators import MinLengthValidator

Categories = [('Electronics' , 'Electronics'),
              ('Medical' , 'Medical'),
              ('Stationary' , 'Stationary'),
              ('Print' , 'Print'),
              ('General Store' , 'General Store'),
              ('Grocery', 'Grocery'),
              ('Books', 'Books'),
              ('Food' , 'Food'),
              ('Others' , 'Others')]

# Create your models here.
class Store(models.Model):
    name = models.CharField(max_length=100)
    address = models.TextField()
    contact = models.CharField(max_length=10, validators=[MinLengthValidator(10)])
    category = models.CharField( choices=Categories , null=True , max_length=20 )
    image = models.ImageField(upload_to='media/images', default='media/images/default.jpg')

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.PositiveIntegerField()    
    store = models.ForeignKey(Store , related_name="products" , on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1) 
    image = models.ImageField(upload_to='media/images', default='media/images/default.jpg')
    def __str__(self):
        return self.name