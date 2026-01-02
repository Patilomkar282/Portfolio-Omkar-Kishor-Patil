import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, Loader2 } from 'lucide-react';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi! I'm Omkar's AI Assistant. Ask me anything about his skills, projects, or experience!", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input.trim();
        setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('https://portfolio-omkar-kishor-patil.onrender.com/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessages(prev => [...prev, { text: data.reply, sender: 'bot' }]);
            } else {
                setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting right now. Please try again later.", sender: 'bot' }]);
            }
        } catch (error) {
            console.error('Chat Error:', error);
            setMessages(prev => [...prev, { text: "Network error. Please make sure the backend is running.", sender: 'bot' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans">
            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col transition-all duration-300 ease-in-out transform origin-bottom-right">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <div className="p-1 bg-white/20 rounded-full">
                                <Bot size={20} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm">Omkar's Assistant</h3>
                                <p className="text-xs text-blue-100 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    Online
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={toggleChat}
                            className="p-1 hover:bg-white/20 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 h-80 space-y-4 bg-gray-50 dark:bg-gray-900/50">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`
                    max-w-[80%] p-3 rounded-2xl text-sm shadow-sm
                    ${msg.sender === 'user'
                                            ? 'bg-blue-600 text-white rounded-br-none'
                                            : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-bl-none'
                                        }
                  `}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-bl-none border border-gray-200 dark:border-gray-700 shadow-sm">
                                    <Loader2 size={16} className="animate-spin text-blue-500" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about my skills..."
                            className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={toggleChat}
                className={`
          flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105
          ${isOpen ? 'rotate-90 opacity-0 pointer-events-none' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'}
        `}
            >
                <MessageCircle size={28} />
            </button>

            {/* Alternative Close Button (visible when open to allow closing by clicking the main FAB spot if desired, 
          but usually the floating window covers it or we swap the icon. 
          Here I just hide the main button and rely on the window's close button, 
          or we can keep the FAB visible and turn it into a close button.
          Let's keep it simple: FAB disappears, window appears.
      */}
            {isOpen && (
                <button
                    onClick={toggleChat}
                    className="absolute bottom-0 right-0 w-14 h-14 bg-gray-600 hover:bg-gray-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform rotate-0"
                >
                    <X size={28} />
                </button>
            )}
        </div>
    );
};

export default ChatWidget;
