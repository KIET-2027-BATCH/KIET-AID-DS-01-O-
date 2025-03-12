from django.contrib.auth.base_user import BaseUserManager
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.utils.translation import gettext_lazy as _

class UserManager(BaseUserManager):
    def email_validation(self, email):
        try:
            validate_email(email)
        except ValidationError:
            raise ValueError(_("You must provide a valid email"))

    def create_user(self, user_name, email, password=None):
        if not user_name:
            raise ValueError(_("Must enter the user name"))
        if not email:
            raise ValueError(_("Email is required"))

        email = self.normalize_email(email)
        self.email_validation(email)

        user = self.model(
            user_name=user_name,
            email=email,
        )
        if password:
            user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, user_name, email, password=None):
        user = self.create_user(user_name, email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user
