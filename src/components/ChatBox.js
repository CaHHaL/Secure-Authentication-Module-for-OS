import React, { useState, useRef, useEffect } from 'react';

const ChatBox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! I'm Secure Mitra, your security assistant. How can I help you today?", sender: 'bot' }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        // Add user message
        setMessages(prev => [...prev, { text: inputMessage, sender: 'user' }]);

        // Simulate bot response based on keywords
        const response = generateResponse(inputMessage.toLowerCase());
        setTimeout(() => {
            setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
        }, 1000);

        setInputMessage('');
    };

    const generateResponse = (message) => {
        if (message.includes('project') && message.includes('about')) {
            return "This is a multi-factor authentication system that combines password verification, face recognition, and OTP validation for enhanced security. It features a modern UI with cybersecurity-themed animations and ensures secure user authentication.";
        }
        if (message.includes('features')) {
            return "Key features include: 1. Password authentication 2. Face recognition verification 3. OTP validation 4. Modern cybersecurity-themed UI 5. Secure session management";
        }
        if (message.includes('face') && (message.includes('recognition') || message.includes('verify'))) {
            return "The face recognition system uses computer vision to verify user identity through webcam capture. It's an additional security layer in our multi-factor authentication process.";
        }
        if (message.includes('otp') || message.includes('authenticator')) {
            return "We use Time-based One-Time Passwords (TOTP) that work with authenticator apps like Google Authenticator or Microsoft Authenticator for an additional layer of security.";
        }
        return "I'm here to help you understand our secure authentication system. Feel free to ask about the project, its features, or specific security measures!";
    };

    return (
        <div className="chat-box-container">
            {!isOpen ? (
                <button className="chat-box-button" onClick={() => setIsOpen(true)}>
                    <span className="chat-box-icon">💬</span>
                    <span>Secure Mitra</span>
                </button>
            ) : (
                <div className="chat-box">
                    <div className="chat-box-header">
                        <div className="header-content">
                            <span className="bot-logo">🤖</span>
                            <h3>Secure Mitra</h3>
                        </div>
                        <button className="close-button" onClick={() => setIsOpen(false)}>
                            <span>✕</span>
                        </button>
                    </div>
                    <div className="chat-box-messages">
                        {messages.map((message, index) => (
                            <div key={index} className={`message ${message.sender}`}>
                                {message.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSendMessage} className="chat-box-input">
                        <div className="input-container">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Type your message..."
                            />
                            <button type="submit">
                                <span className="send-icon">➤</span>
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatBox; 