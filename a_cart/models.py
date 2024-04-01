from django.db import models
from a_users.models import Profile
from a_products.models import Product


# Create your models here
class Order(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    complete = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Order of {self.profile}'


class OrderProduct(models.Model):
    order = models.ForeignKey(Order, related_name='products', blank=True ,on_delete=models.CASCADE) # lo que hace el related_name='productos' es crear un atributo inverso en el modelo relacionado (Order en este caso), para acceder a los productos.
    product = models.ForeignKey(Product, blank=True ,on_delete=models.CASCADE) 
    quantity = models.PositiveIntegerField(default=1)
    
    def __str__(self):
        return f'{self.product} in the {self.order}'