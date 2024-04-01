from django.db import models

# Create your models here.
class Product(models.Model):
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=50, decimal_places=3)
    available_stock = models.PositiveIntegerField(default=1)
    thumbnail = models.ImageField(upload_to='thumbnails/', null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'{self.title}'

class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='product_images/')
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return str(self.image)