from django.urls import path
from . import views


urlpatterns = [
    path('', views.listProfiles),
    path('<int:pk>/', views.profileDetails),
]