from rest_framework import serializers
from .models import Product, ProductImage


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('id', 'image', 'created')
        read_only_fields = ('created',)


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Product
        fields = '__all__' # O una tupla con cada campo del modelo que uso
        read_only_fields = ('created',) # se le pone la coma para que reconozca que es una tupla