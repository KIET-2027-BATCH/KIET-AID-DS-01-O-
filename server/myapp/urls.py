from django.urls import path
from .views import predict_revenue, chat_with_ai

urlpatterns = [
    path("", predict_revenue, name="predict_revenue"),  # Ensure this line is correct
    path("chat/", chat_with_ai, name="chat_with_ai"),  # Add this line
]
