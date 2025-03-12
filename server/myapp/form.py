from django.contrib.auth.forms import UserChangeForm,UserCreationForm
from .models import User
class Usercreationform(UserCreationForm):
    class Meta(UserCreationForm):
        model = User
        fields = ['email',"user_name"]
        error_class = 'error'

class Userchangeform(UserChangeForm):
    class Meta(UserChangeForm):
        model = User
        fields = ['email',"user_name"]
        error_class = 'error'