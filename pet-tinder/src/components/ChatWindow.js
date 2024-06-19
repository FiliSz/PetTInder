import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMinimize, faTimes } from '@fortawesome/free-solid-svg-icons';

function ChatWindow({ selectedProfile, onClose, messages, onSendMessage, isMinimized, onToggleMinimized }) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (input.trim() === '') return;

    const newMessage = { text: input, sender: 'user' };
    onSendMessage(newMessage);
    setInput('');
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className={`chat-window ${isMinimized ? 'minimized' : ''}`}>
      <div className="chat-header">
        <h2>Rozmowa z {selectedProfile.name.first}</h2>
        <div>
          <button className="icon-button" onClick={onToggleMinimized}>
            <FontAwesomeIcon icon={faWindowMinimize} />
          </button>
          <button className="icon-button" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </div>
      {!isMinimized && (
        <>
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.sender === 'user' && <div className="message-label">Ty piszesz:</div>}
                <p>{msg.text}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="input-area">
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Napisz wiadomość..."
            />
            <button className="send-button" onClick={handleSend}>Wyślij</button>
          </div>
        </>
      )}
    </div>
  );
}

export default ChatWindow;
