import { useState } from "react";
import axios from "axios";
import Header from "@/components/home/header";

export default function Prediction() {
  const [formData, setFormData] = useState({
    movie_name: "",
    budget: "",
    popularity: "",
    runtime: "",
    vote_average: "",
    vote_count: "",
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/predict/", formData);
      setPrediction(response.data.predicted_revenue);
    } catch (error) {
      console.error("Error making prediction:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <div className="flex flex-col items-center justify-center py-10">
        <h1 className="text-2xl font-bold mb-6">Movie Revenue Prediction</h1>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="movie_name">Movie Name</label>
            <input
              type="text"
              name="movie_name"
              value={formData.movie_name}
              onChange={handleChange}
              placeholder="Movie Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="budget">Budget</label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="Budget"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="popularity">Popularity</label>
            <input
              type="text"
              name="popularity"
              value={formData.popularity}
              onChange={handleChange}
              placeholder="Popularity"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="runtime">Runtime</label>
            <input
              type="text"
              name="runtime"
              value={formData.runtime}
              onChange={handleChange}
              placeholder="Runtime"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="vote_average">Vote Average</label>
            <input
              type="text"
              name="vote_average"
              value={formData.vote_average}
              onChange={handleChange}
              placeholder="Vote Average"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="vote_count">Vote Count</label>
            <input
              type="text"
              name="vote_count"
              value={formData.vote_count}
              onChange={handleChange}
              placeholder="Vote Count"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Predict Revenue
          </button>
        </form>
        {prediction && (
          <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold">Predicted Revenue: {prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
}
