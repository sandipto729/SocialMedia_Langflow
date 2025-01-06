import { useState, useEffect, useCallback } from 'react';
import { MessageCircle, Send, Loader2 } from 'lucide-react';

const ChatClient = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ws, setWs] = useState(null);
  const [requestId, setRequestId] = useState(null);
  const [error, setError] = useState(null);

  // WebSocket connection setup
  useEffect(() => {
    const wsConnection = new WebSocket('ws://13.51.196.191:3000');

    wsConnection.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'requestId') {
        setRequestId(data.requestId);
      } else if (data.type === 'response') {
        setMessages(prev => [...prev, { text: data.message, type: 'response' }]);
        setIsLoading(false);
      } else if (data.type === 'error') {
        setError(data.message);
        setIsLoading(false);
      }
    };

    wsConnection.onerror = (error) => {
      setError('WebSocket connection error');
      setIsLoading(false);
    };

    setWs(wsConnection);

    return () => {
      wsConnection.close();
    };
  }, []);

  // Send message handler
  const sendMessage = useCallback(async () => {
    if (!inputMessage.trim() || !requestId || isLoading) return;

    try {
      setIsLoading(true);
      setError(null);
      setMessages(prev => [...prev, { text: inputMessage, type: 'user' }]);

      const response = await fetch('http://13.51.196.191:3000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input_value: inputMessage,
          requestId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setInputMessage('');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, [inputMessage, requestId, isLoading]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 p-3 bg-blue-50 rounded-lg">
        <MessageCircle className="text-blue-500" />
        <h1 className="text-xl font-semibold text-gray-800">Chat Client</h1>
      </div>

      {/* Messages Container */}
      <div className="h-96 overflow-y-auto mb-4 p-4 border rounded-lg">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 p-3 rounded-lg ${
              message.type === 'user' 
                ? 'bg-blue-100 ml-auto max-w-[80%]' 
                : 'bg-gray-100 mr-auto max-w-[80%]'
            }`}
          >
            <p className="text-gray-800">{message.text}</p>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-500">
            <Loader2 className="animate-spin" />
            <span>Processing...</span>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Input Area */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !inputMessage.trim()}
          className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatClient;