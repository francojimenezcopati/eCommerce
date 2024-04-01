from rest_framework import serializers
from a_products.serializer import ProductSerializer
from .models import OrderProduct, Order
from a_products.models import Product

from a_core.errors import OrderProductAlreadyExists
from django.core.exceptions import ObjectDoesNotExist



class OrderSerializer(serializers.ModelSerializer):
    # profile = ProfileSerializer()
    
    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ('created_at',)

class OrderProductSerializer(serializers.ModelSerializer):
    order = OrderSerializer(required=False)
    product = ProductSerializer(required=False)
    
    class Meta:
        model = OrderProduct
        fields = '__all__'
        # depth = 1 # <-------------------------- LA CLAVE DE LA VIDA PARA SERVIR BIEN LA DATA PARA EL FRONTEND
    
    def create(self, validated_data):
        order_data = validated_data.pop('order')
        product_data = validated_data.pop('product')
        
        order = Order.objects.get(**order_data)
        product = Product.objects.get(**product_data)
        
        try:
            OrderProduct.objects.get(order=order, product=product)
            raise OrderProductAlreadyExists()
        except ObjectDoesNotExist:
            pass
        
        order_product = OrderProduct.objects.create(order=order, product=product, **validated_data)
        
        return order_product
    
    def update(self, instance, validated_data):
        instance.quantity = validated_data.get('quantity', instance.quantity)
        instance.save()
        return instance