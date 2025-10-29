// Fix: Replaced placeholder content with a valid React component.
import React, { useState, useEffect, useRef } from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { ChatMessage } from '../types';
import { getOrchestratorResponse } from '../services/geminiService';
import Spinner from './Spinner';

const OrchestratorChat: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: ChatMessage = { sender: 'user', text: input, timestamp: new Date().toISOString() };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            // FIX: Pass the actual message history to maintain conversation context.
            const responseText = await getOrchestratorResponse(messages, currentInput);
            const orchestratorMessage: ChatMessage = { sender: 'orchestrator', text: responseText, timestamp: new Date().toISOString() };
            setMessages(prev => [...prev, orchestratorMessage]);
        } catch (error) {
            const errorMessage: ChatMessage = { sender: 'orchestrator', text: 'Error contacting orchestrator.', timestamp: new Date().toISOString() };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="module-panel chat-panel">
            <h3>Orchestrator Chat</h3>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        <p><strong>{msg.sender === 'user' ? 'You' : 'Orchestrator'}:</strong> {msg.text}</p>
                    </div>
                ))}
                {isLoading && <Spinner />}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                    placeholder="Message Orchestrator..."
                    disabled={isLoading}
                />
                <button onClick={handleSend} disabled={isLoading}>Send</button>
            </div>
        </div>
    );
};

export default OrchestratorChat;