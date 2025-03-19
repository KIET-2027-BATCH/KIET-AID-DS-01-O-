import { useState } from "react";
import axios from "axios";
import Header from "@/components/home/header";

export default function Chat() {
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = input;
    setMessages((prevMessages) => [...prevMessages, { user: userMessage, bot: "..." }]);
    setInput("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/chat/", {
        message: userMessage,
      });
      const botMessage = response.data.message;

      setMessages((prevMessages) =>
        prevMessages.map((msg, index) =>
          index === prevMessages.length - 1 ? { ...msg, bot: botMessage } : msg
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <div className="flex flex-col items-center justify-center py-10">
        <h1 className="text-2xl font-bold mb-6">AI Chatbot</h1>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
          <div className="mb-4 h-64 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className="mb-2">
                <p className="text-sm text-blue-500">You: {msg.user}</p>
                <p className="text-sm text-green-500">Bot: {msg.bot}</p>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <button
            onClick={handleSendMessage}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
