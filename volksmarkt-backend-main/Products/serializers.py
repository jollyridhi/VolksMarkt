from rest_framework import serializers
from Products.models import Product, LANGUAGE_CHOICES, STYLE_CHOICES


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', '']