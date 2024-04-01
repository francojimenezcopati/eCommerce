from rest_framework import serializers
from .models import Profile, Address



class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ('address', 'city', 'country', 'zipcode')


class ProfileSerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True, read_only=True)
    class Meta:
        model = Profile
        fields = '__all__'
        depth = 1