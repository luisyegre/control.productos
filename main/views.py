from django.shortcuts import render
from django.contrib.auth.decorators import login_required,permission_required
# Create your views here.
#esto es una vista

@login_required(login_url="/auth/login/")
def index (req):
  return render(req,"main/index.html",{"nombre":"luis"})