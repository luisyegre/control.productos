from django.urls import path
from .views import ProductoView,CategoriaView

urlpatterns=[
  path('producto/',ProductoView.as_view()),
  path('producto/<int:pk>',ProductoView.as_view()),
  path('categoria/',CategoriaView.as_view()),
  path('categoria/<int:pk>',CategoriaView.as_view()),
  
]
