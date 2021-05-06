from django.db import models

class ProductoManager(models.Manager):
  def get_serialized(self,*args,**kwargs):
    producto=self.get(*args,**kwargs)
    producto_serialized={
      "pk":producto.pk,
      "nombre":producto.nombre,
      "precio":producto.precio,
      "categoria":producto.categoria.nombre
    }
    return producto_serialized
  def filter_serialized(self,*args,**kwargs):
    productos=self.filter(*args,**kwargs)
    productos_serialized=[]
    for producto in productos:
      productos_serialized.append({
        "pk":producto.pk,
        "nombre":producto.nombre,
        "precio":producto.precio,
        "categoria":producto.categoria.nombre
      })
    return productos_serialized
    
  def all_serialized(self):
    productos=self.all()
    productos_serialized=[]
    for producto in productos:
      productos_serialized.append({
        "pk":producto.pk,
        "nombre":producto.nombre,
        "precio":producto.precio,
        "categoria":producto.categoria.nombre
      })
    return productos_serialized
    
class CategoriaManager(models.Manager):
  def get_serialized(self,*args,**kwargs):
    categoria=self.get(*args,**kwargs)
    categoria_serialized={
      "pk":categoria.pk,
      "nombre":categoria.nombre,
    }
    return categoria_serialized

  def filter_serialized(self,*args,**kwargs):
    categorias=self.filter(*args,**kwargs)
    categoria_serialized=[]
    for categoria in categorias:
      categoria_serialized.append({
        "pk":categoria.pk,
        "nombre":categoria.nombre,
      })
    return categoria_serialized
    
  def all_serialized(self):
    categorias=self.all()
    categorias_serialized=[]
    for categoria in categorias:
      categorias_serialized.append({
        "pk":categoria.pk,
        "nombre":categoria.nombre,
      })
    return categorias_serialized

class Categoria(models.Model):
  nombre=models.CharField(max_length=100)
  objects=CategoriaManager()
  def __str__(self):
    return self.nombre
    
class Producto(models.Model):
  nombre=models.CharField(max_length=255)
  precio=models.FloatField()
  categoria=models.ForeignKey(Categoria,on_delete=models.CASCADE)
  objects=ProductoManager()

  def __str__(self):
    return self.nombre