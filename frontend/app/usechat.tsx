import { useState } from 'react';

export function useChat({ api, onError }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleInputChange = (text) => {
    setInput(text);
  };

  const handleSubmit = async () => {
    try {
      const newMessage = { id: Date.now().toString(), content: input, role: 'user' };
      setMessages([...messages, newMessage]);

      // Mock API call
      const responseMessage = { id: (Date.now() + 1).toString(), content: 'Mock response', role: 'bot' };
      setMessages((prevMessages) => [...prevMessages, responseMessage]);
    } catch (e) {
      if (onError) onError(e);
    } finally {
      setInput('');
    }
  };

  return { messages, input, handleInputChange, handleSubmit };
}