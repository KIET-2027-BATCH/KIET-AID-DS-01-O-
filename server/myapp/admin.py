from django.contrib import admin
from .models import User  # Import your model

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'first_name', 'middle_name', 'last_name', 'age')
    search_fields = ('username', 'email')
    list_filter = ('age',)
