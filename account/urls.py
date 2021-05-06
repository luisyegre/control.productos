from django.urls import path,include 
from django.contrib.auth.views import LoginView,LogoutView
from .views import RegisterView

urlpatterns=[
  path('login/',LoginView.as_view(),name="login"),
  path('register/',RegisterView.as_view(),name="register"),
  path('logout/',LogoutView.as_view(),name="logout")
]
