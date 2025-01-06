import React, { useState, useEffect, useCallback } from "react";
import { MessageCircle, Send, Loader2, Moon, Sun } from "lucide-react";

const ChatClient = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ws, setWs] = useState(null);
  const [requestId, setRequestId] = useState(null);
  const [error, setError] = useState(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const wsConnection = new WebSocket("wss://8f07-13-51-196-191.ngrok-free.app");
    wsConnection.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "requestId") {
        setRequestId(data.requestId);
      } else if (data.type === "response") {
        setMessages((prev) => [
          ...prev,
          { text: data.message, type: "response" },
        ]);
        setIsLoading(false);
      } else if (data.type === "error") {
        setError(data.message);
        setIsLoading(false);
      }
    };

    wsConnection.onerror = () => {
      setError("WebSocket connection error");
      setIsLoading(false);
    };

    setWs(wsConnection);
    return () => wsConnection.close();
  }, []);

  const sendMessage = useCallback(async () => {
    if (!inputMessage.trim() || !requestId || isLoading) return;

    try {
      setIsLoading(true);
      setError(null);
      setMessages((prev) => [...prev, { text: inputMessage, type: "user" }]);

      const response = await fetch("https://8f07-13-51-196-191.ngrok-free.app/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input_value: inputMessage, requestId }),
      });

      if (!response.ok) throw new Error("Failed to send message");
      setInputMessage("");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, [inputMessage, requestId, isLoading]);

  return (
    <div className={`${isDark ? "dark" : ""}`}>
      <div className="w-full max-w-2xl mx-auto p-4 bg-card rounded-lg shadow-lg transition-colors duration-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 p-2">
            <MessageCircle className="text-primary w-5 h-5" />
            <h1 className="text-lg font-semibold text-primary">Chat</h1>
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full hover:bg-secondary transition-colors">
            {isDark ? (
              <Sun className="w-5 h-5 text-primary" />
            ) : (
              <Moon className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>

        <div className="h-96 overflow-y-auto mb-4 p-4 rounded-lg bg-background">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 p-3 rounded-lg max-w-[80%] ${
                message.type === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "mr-auto bg-secondary text-secondary-foreground"
              }`}>
              <p>{message.text}</p>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="animate-spin w-4 h-4" />
              <span className="text-sm">Processing...</span>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 p-3 bg-background text-primary rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="p-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatClient;
