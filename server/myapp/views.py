from django.shortcuts import render
import pickle
from django.urls import path
import numpy as np
from django.http import JsonResponse
from rest_framework.decorators import api_view
import os

# Load the trained model
MODEL_PATH = os.path.join(os.path.dirname(__file__), "../movie_revenue_model.pkl")
with open(MODEL_PATH, "rb") as file:
    model = pickle.load(file)

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
        return JsonResponse({"error": str(e)}, status=400)


urlpatterns = [
    path("predict/", predict_revenue, name="predict_revenue"),
]
