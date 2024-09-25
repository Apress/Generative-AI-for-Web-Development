import { useState, useEffect, useRef } from 'react';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [threadId, setThreadId] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const messageInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  const handleSendMessage = async () => {
    if (currentMessage.trim() === '' || isSending) return;

    const newMessages = [...messages, { type: 'user', content: currentMessage }];
    setMessages(newMessages);
    setCurrentMessage('');
    setIsSending(true);

    let currentThreadId = threadId;

    if (!currentThreadId) {
      const response = await fetch('/api/thread', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      currentThreadId = data.threadId;
      setThreadId(currentThreadId);
    }

    const response = await fetch('/api/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ threadId: currentThreadId, message: currentMessage }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value, { stream: !done });

      setMessages((prevMessages) => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        if (lastMessage.type === 'user') {
          return [...prevMessages, { type: 'response', content: chunkValue }];
        } else {
          return [
            ...prevMessages.slice(0, prevMessages.length - 1),
            { ...lastMessage, content: lastMessage.content + chunkValue },
          ];
        }
      });
    }

    setIsSending(false);
    messageInputRef.current.focus();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="messages" ref={chatContainerRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.type === 'user' ? 'user-message' : 'response-message'}`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          autoFocus
          placeholder="Type your message..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          ref={messageInputRef}
        />
        <button onClick={handleSendMessage} disabled={!currentMessage.trim() || isSending}>
          Send
        </button>
      </div>
      <style jsx>{`
        .chat-container {
          display: flex;
          flex-direction: column;
          height: calc(100vh - 20px);
          max-width: 600px;
          margin: 0 auto;
          padding: 16px;
          box-sizing: border-box;
        }
        .messages {
          flex-grow: 1;
          overflow-y: auto;
          margin-bottom: 16px;
          padding: 8px;
          background-color: #f9f9f9;
          border-radius: 8px;
          border: 1px solid #ddd;
        }
        .message {
          margin-bottom: 12px;
          padding: 12px;
          border-radius: 8px;
          max-width: 75%;
        }
        .user-message {
          background-color: #e1ffc7;
          align-self: flex-end;
        }
        .response-message {
          background-color: #f1f1f1;
          align-self: flex-start;
        }
        .input-container {
          display: flex;
          align-items: center;
        }
        input {
          flex-grow: 1;
          padding: 12px;
          font-size: 16px;
          border-radius: 8px;
          border: 1px solid #ddd;
          margin-right: 8px;
          outline: none;
        }
        button {
          padding: 12px 24px;
          font-size: 16px;
          border-radius: 8px;
          border: none;
          background-color: #0070f3;
          color: white;
          cursor: pointer;
          outline: none;
        }
        button:disabled {
          background-color: #999;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default ChatPage;
