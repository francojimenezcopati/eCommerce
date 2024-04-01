from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.PositiveBigIntegerField()
    # have an 'addresses' field for the oneToMany realtionship
    
    def __str__(self) -> str:
        return self.user.username


class Address(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='addresses')
    
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    country = models.CharField(max_length=100)
    zipcode = models.PositiveSmallIntegerField()
    
    def __str__(self) -> str:
        return self.address