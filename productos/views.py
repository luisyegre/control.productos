from django.http import JsonResponse 
from django.views.generic.base import View
from .forms import ProductoForm
from .models import Producto
from .models import Categoria
import json

class ProductoView(View):
  def get(self,req,pk=0):
    response={"mensaje":"got","data":'',"error":False}
    
    if pk>0:
      producto= Producto.objects.filter_serialized(pk=pk)
      if not producto:
        response["mensaje"]="producto no existe"
        response["error"]=True
        return JsonResponse(response)
    
      response["data"]=producto[0]
      return JsonResponse(response)
    else:
      producto=Producto.objects.all_serialized()
      response["data"]=producto
      return JsonResponse(response)

  def post(self,req,*args,**kwargs):
    data=json.loads(req.body)
    form=ProductoForm(data)

    if form.is_valid():
      categoria= Categoria.objects.filter(pk=data["categoria"])
      if not categoria:
        return JsonResponse({"error":True,"mensaje":"categoria no existe"})

      data["categoria"]=int(data["categoria"])
      data["precio"]=float(data["precio"])
      data["categoria"]=categoria.first()

      producto=Producto.objects.create(**data)
      print(producto)
      producto=Producto.objects.get_serialized(pk=producto.pk)
      return JsonResponse({"error":False,"mensaje":"creado","data":producto})

    else:
      return JsonResponse({"error":True,"mensaje":"campos vacios/incorrectos"})

  def delete(self,req,pk=0):
    producto=Producto.objects.filter(pk=pk)
    if not producto:
      return JsonResponse({"error":True,"mensaje":"producto no existe"})
    else:
      producto.delete()
      return JsonResponse({"error":False,"mensaje":"producto eliminado"})

  def put(self,req,pk=0):
    pass

class CategoriaView(View):
  def get(self,req,pk=0):
    response={"mensaje":"got","data":'',"error":False}
    
    if pk>0:
      categoria=Categoria.objects.filter_serialized(pk=pk)
      if not categoria:
        response["mensaje"]="categoria no existe"
        response["error"]=True
        return JsonResponse(response)

      response["data"]=categoria[0]
      return JsonResponse(response)
    else:
      categoria=Categoria.objects.all_serialized()
      response["data"]=categoria
      return JsonResponse(response)