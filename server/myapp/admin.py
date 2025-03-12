from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .form import Usercreationform, Userchangeform  # Corrected import from 'form' to 'forms'
from .models import User 


class UserAdmin(BaseUserAdmin):
    ordering = ['email']
    add_form = Usercreationform
    form = Userchangeform
    model = User

    list_display = ["email", "user_name", "is_staff", "is_active"]
    list_display_links = ["email"]
    list_filter = ["email", "user_name", "is_staff", "is_active"]
    search_fields = ["email", "user_name"]


    fieldsets = (
        (_("Personal Info"), {"fields": ("email", "user_name", "password")}),
        (_("Permissions"), {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        (_("Important Dates"), {"fields": ("last_login",)}),
    )

    add_fieldsets = (
        (_("New User Details"), {
            "classes": ("wide",),  # Makes the form wider
            "fields": ("email", "user_name", "password1", "password2", "is_staff", "is_active"),
        }),
    )
    


admin.site.register(User, UserAdmin)
