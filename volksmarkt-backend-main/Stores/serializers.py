from rest_framework import serializers
from Stores.models import Store, Product


class StoreSerializer(serializers.ModelSerializer):
    products = serializers.PrimaryKeyRelatedField(many=True, read_only = True)#removed queryset=Product.objects.all()
    class Meta:
        model = Store
        fields = ['id', 'name', 'category' , 'address', 'contact','products','image']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'quantity' , 'store', 'image']

