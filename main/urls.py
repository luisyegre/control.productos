from django.urls import path,include
from .views import *  

urlpatterns = [
  path("home/",index),
  path("",index),
  path("auth/",include('account.urls')),
]