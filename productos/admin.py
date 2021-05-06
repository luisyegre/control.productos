from django.contrib import admin

# Register your models here.
from .models import Categoria,Producto

# Register your models here.
admin.site.register(Categoria)
admin.site.register(Producto)