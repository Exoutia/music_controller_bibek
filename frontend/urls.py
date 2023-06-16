from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('join-room', views.index),
    path('create-room', views.index),
    path('room/<str:roomCode>', views.index),
]
