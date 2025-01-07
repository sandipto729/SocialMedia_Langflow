import React, { useState, useEffect, useCallback, useRef } from "react";
import { io } from "socket.io-client";
import { MessageCircle, Send, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EnhancedChatClient = ({ isExpanded, setIsExpanded }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [requestId, setRequestId] = useState(null);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const welcomeMessageShownRef = useRef(false);

  const socket = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add welcome message when chat is opened
  useEffect(() => {
    if (isExpanded && !welcomeMessageShownRef.current) {
      setMessages([
        {
          text: "Hello there! How can I help you today?",
          type: "response",
        },
      ]);
      welcomeMessageShownRef.current = true;
    }
  }, [isExpanded]);

  // Initialize socket connection
  useEffect(() => {
    socket.current = io(import.meta.env.VITE_BACKEND_URI, {
      withCredentials: true,
    });

    socket.current.on("connect", () => {
      console.log("Connected to server:", socket.current.id);
    });

    socket.current.on("requestId", (data) => {
      setRequestId(data.requestId);
      console.log("Request ID received:", data.requestId);
    });

    socket.current.on("response", (data) => {
      setMessages((prev) => [
        ...prev,
        { text: data.message, type: "response" },
      ]);
      setIsLoading(false);
    });

    socket.current.on("error", (data) => {
      setError(data.message);
      setIsLoading(false);
    });

    socket.current.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const sendMessage = useCallback(() => {
    if (!inputMessage.trim() || !requestId || isLoading) return;

    try {
      setIsLoading(true);
      setError(null);
      setMessages((prev) => [...prev, { text: inputMessage, type: "user" }]);

      fetch(import.meta.env.VITE_BACKEND_URI + "/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input_value: inputMessage, requestId }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to send message");
          }
          setInputMessage("");
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, [inputMessage, requestId, isLoading]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      {!isExpanded ? (
        <Button
          onClick={() => setIsExpanded(true)}
          size="lg"
          className="rounded-full w-14 h-14 bg-gray-800 hover:bg-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      ) : (
        <div className="relative">
          <Card className="w-[380px] shadow-2xl bg-gray-900 text-gray-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gray-800 text-white rounded-t-lg">
              <CardTitle className="text-lg font-semibold">
                Chat with AI Assistant
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="h-8 w-8 p-0 hover:bg-gray-700">
                <span className="text-xl text-white">×</span>
              </Button>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-[450px] flex flex-col">
                <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.type === "user"
                        ? "justify-end"
                        : "justify-start"
                        }`}>
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 shadow-sm ${message.type === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700 text-gray-100"
                          }`}>
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-center justify-center gap-4 text-gray-100 bg-gray-900 p-4 rounded-lg">
                      <div className="flex gap-1">
                        <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                        <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                      <span className="text-sm">Loading, please wait...</span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {error && (
                  <div className="mb-4 p-2 text-sm text-red-500 bg-gray-800 rounded-lg border border-red-700">
                    {error}
                  </div>
                )}

                <div className="flex gap-2 bg-gray-800 p-2 rounded-lg">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Ask about your analytics..."
                    className="flex-1 bg-gray-700 text-gray-100 placeholder-gray-400"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={isLoading || !inputMessage.trim()}
                    size="icon"
                    className="bg-blue-600 hover:bg-blue-700 transition-colors">
                    <Send className="h-4 w-4 text-white" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>

  );
};

export default EnhancedChatClient;
