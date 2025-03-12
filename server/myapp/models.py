from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin,BaseUserManager
from django.contrib.auth.hashers import make_password
from django.utils.translation import gettext_lazy as _

from .managers import UserManager

class User(AbstractBaseUser, PermissionsMixin):
    user_name = models.CharField(_("user name"), max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
      

    USERNAME_FIELD = "email" 
    REQUIRED_FIELDS = ["user_name"]
    objects = UserManager()
 
    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")
    def __str__(self):
        return self.email
