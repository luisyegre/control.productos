from django.contrib.auth.forms import UserCreationForm
from .models import User

class UserRegisterForm(UserCreationForm):

  class Meta:
    model=User
    fields=('name','last_name','email','password1','password2')
