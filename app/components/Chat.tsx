"use client";
import React, { useState } from "react";

interface Message {
  role: "assistant" | "user";
  content?: string;
  documents?: string[];
}

const Chat = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendChatMessage = async () => {
    try {
      if (!message.trim()) return;

      // show user message immediately
      setMessages((prev) => [...prev, { role: "user", content: message }]);

      // send to backend
      const res = await fetch(
        `https://rag-chat-ai-backend.onrender.com/chat?message=${encodeURIComponent(message)}`
      );
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      console.log("Frontend received:", data);

      // ✅ pick reply from backend format
      const reply = data?.response ?? "No reply";

      // show assistant reply
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);

      setMessage(""); // clear input
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="p-4">
      {/* Messages */}
      <div className="mb-20">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`my-2 ${msg.role === "user" ? "text-right" : "text-left"}`}
          >
            <span
              className={`inline-block px-3 py-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="fixed bottom-4 w-96 flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
          className="border px-2 py-1 rounded w-full"
        />
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded"
          onClick={handleSendChatMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
