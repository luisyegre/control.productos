from django.test import Client
from .models import Producto,Categoria

csrf_client=Client()
resp=csrf_client.post('/login/',{"email":"luis@email.com","password":"123321fe"})
print(resp)