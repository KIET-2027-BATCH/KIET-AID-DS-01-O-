from django.shortcuts import render
import pickle
from django.urls import path
import numpy as np
from django.http import JsonResponse
from rest_framework.decorators import api_view
import os
import openai
import logging

# Load the trained model
MODEL_PATH = os.path.join(os.path.dirname(__file__), "../movie_revenue_model.pkl")
with open(MODEL_PATH, "rb") as file:
    model = pickle.load(file)

openai.api_key = os.getenv("OPENAI_API_KEY")

logger = logging.getLogger(__name__)

@api_view(["POST"])
def predict_revenue(request):
    try:
        data = request.data
        budget = float(data["budget"])
        popularity = float(data["popularity"])
        runtime = float(data["runtime"])
        vote_average = float(data["vote_average"])
        vote_count = float(data["vote_count"])

        # Make prediction
        input_features = np.array([[budget, popularity, runtime, vote_average, vote_count]])
        predicted_revenue = model.predict(input_features)[0]

        return JsonResponse({"predicted_revenue": predicted_revenue}, safe=False)
    except Exception as e:
        logger.error(f"Error in predict_revenue: {str(e)}")
        return JsonResponse({"error": str(e)}, status=400)

@api_view(["POST"])
def chat_with_ai(request):
    try:
        user_message = request.data.get("message")
        logger.info(f"Received message: {user_message}")
        response = openai.Completion.create(
            engine="davinci",
            prompt=user_message,
            max_tokens=150
        )
        ai_message = response.choices[0].text.strip()
        logger.info(f"AI response: {ai_message}")
        return JsonResponse({"message": ai_message}, safe=False)
    except Exception as e:
        logger.error(f"Error in chat_with_ai: {str(e)}")
        return JsonResponse({"error": str(e)}, status=400)

urlpatterns = [
    path("predict/", predict_revenue, name="predict_revenue"),
    path("chat/", chat_with_ai, name="chat_with_ai"),
]
