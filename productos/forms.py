from django import forms

class ProductoForm(forms.Form):
  nombre= forms.CharField(label="nombre del producto",max_length=100,min_length=3,required=True)
  precio= forms.FloatField(label="precio del producto",required=True)
  categoria= forms.IntegerField(label="categoria del producto",required=True)


