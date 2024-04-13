from django.urls import path
from . import views

urlpatterns = [
    path("products/", views.listOrderProducts),
    path("products/<int:pk>/", views.OrderProductDetails),
]
