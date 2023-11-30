"use client";
// Import necessary React modules
// Import necessary React modules
// Import necessary React modules
import React, { FC, useState, useEffect, ChangeEvent, FormEvent } from "react";

// Interface for ChatPageProps
interface ChatPageProps {}

// ChatPage component
const ChatPage: FC<ChatPageProps> = () => {
  // State for user input and chat history
  const [inputText, setInputText] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<any[]>([]);

  // Scroll to the bottom of the chat history when it updates
  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chatHistory]);

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Display user input in the chat
    const userMessage = { text: inputText, isUser: true };
    setChatHistory([...chatHistory, userMessage]);

    // Send user input to the backend for processing
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({
          prompt: inputText,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      // Display the response from the backend in the chat
      const botMessage = { text: response.result.choices[0].text, isUser: false };
      setChatHistory((prevChat) => [...prevChat, botMessage]);
    } catch (error) {
      console.error('Error sending/receiving data:', error);
    }

    // Clear the input field after submission
    setInputText('');
  };

  // Return the JSX structure
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f4f4f4' }}>
      <div style={{ border: '2px solid #333', borderRadius: '20px', margin: '20px auto', width: '40%', overflow: 'hidden' }}>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <h1 style={{ fontWeight: 'bold', fontSize: '2em' }}>Chat with an Expert</h1>
        </div>
      </div>
      <div id="chat-container" style={{ flex: '1', padding: '20px', overflowY: 'hidden', marginBottom: '20px' }}>
        {chatHistory.map((item, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: item.isUser ? 'flex-end' : 'flex-start', marginBottom: '16px' }}>
            <div style={{ maxWidth: '70%', padding: '10px', borderRadius: '8px', backgroundColor: item.isUser ? '#4caf50' : '#e0e0e0', color: item.isUser ? '#fff' : '#333' }}>
              {item.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', padding: '20px', margin: '0 auto', width: '75%' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)}
          placeholder="Type your message..."
          style={{ flex: '1', padding: '15px', height:'100%', width: '175%', border: '1px solid #ccc', borderRadius: '8px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 25px', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
