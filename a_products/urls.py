from django.urls import path
from .views import listProducts, productDetails


urlpatterns = [
    path('', listProducts),
    path('<int:pk>/', productDetails),
]