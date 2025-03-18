from django.urls import path
from .views import predict_revenue

urlpatterns = [
    path("", predict_revenue, name="predict_revenue"),  # Ensure this line is correct
]
