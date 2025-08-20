"use client";
import { useRef, useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

interface Message {
  id: number;
  type: "user" | "system";
  content: string;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef(1);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: nextIdRef.current++,
      type: "user",
      content: currentMessage,
      timestamp: new Date(),
    };

    // Show user message immediately
    setMessages((prev) => [...prev, userMessage]);
    const messageToSend = currentMessage;
    setCurrentMessage("");

    try {
      const res = await fetch(
        `http://localhost:8000/chat?message=${encodeURIComponent(
          messageToSend
        )}`
      );
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      const replyMessage: Message = {
        id: nextIdRef.current++,
        type: "system",
        content: data?.response ?? "No reply",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, replyMessage]);
    } catch {
      const errorMessage: Message = {
        id: nextIdRef.current++,
        type: "system",
        content: "Network error while fetching chat response",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen pt-16 lg:pt-0 transition-all duration-300">
      {/* Messages Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 h-full">
          <div className="p-2 sm:p-4 flex flex-col space-y-4 max-w-3xl mx-auto">
            {/* Chat Messages */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-lg px-3 py-2 sm:px-4 sm:py-3 ${
                    msg.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="p-2 sm:p-4 border-t border-border bg-card flex-shrink-0">
        <div className="max-w-3xl mx-auto flex flex-col">
          <div className="flex gap-2">
            <Textarea
              placeholder="Ask me anything about your documents..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              className="min-h-[50px] sm:min-h-[60px] resize-none text-sm sm:text-base flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!currentMessage.trim()}
              className="self-end"
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
