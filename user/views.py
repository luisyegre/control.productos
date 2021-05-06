from django.shortcuts import render,redirect
from django.views.generic import View
from .forms import UserRegisterForm

class RegisterView(View):
  def get(self,req,*args,**kwargs):
    form=UserRegisterForm()
    return render(req,"registration/register.html",{"form":form})

  def post(self,req,*args,**kwargs):
    form=UserRegisterForm(req.POST)
    if form.is_valid():
      try:
        form.save()
        return redirect('login')
      except:
        return redirect('register')

    else:
      return render(req,"registration/register.html",{"form":form,"error":"datos invalidos"})