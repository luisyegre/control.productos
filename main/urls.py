from django.urls import path,include
from .views import *  

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
  path("home/",index),
  path("",index),
  path("auth/",include('user.urls')),
] + static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)