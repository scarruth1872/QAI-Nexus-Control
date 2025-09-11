
import React, { useState, useEffect, useRef } from 'react';
import { Chat } from '@google/genai';
// FIX: Corrected all import paths to be relative.
import { createOrchestratorChatSession } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Spinner } from './Spinner';
import { NexusIcon, SendIcon } from './Icons';

export const OrchestratorChat: React.FC = () => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [isChatLoading, setIsChatLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const chatSession = createOrchestratorChatSession();
        setChat(chatSession);
        setChatHistory([{
            role: 'model',
            text: 'Nexus Orchestrator online. I am the integrative brain of this QAI system. How may I assist you?'
        }]);
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isChatLoading || !currentMessage.trim() || !chat) return;

        const messageToSend = currentMessage;
        setCurrentMessage('');
        setIsChatLoading(true);
        setChatHistory(prev => [...prev, { role: 'user', text: messageToSend }]);

        try {
            const response = await chat.sendMessage({ message: messageToSend });
            setChatHistory(prev => [...prev, { role: 'model', text: response.text }]);
        } catch (error) {
            console.error('Orchestrator chat error:', error);
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during chat.";
            setChatHistory(prev => [...prev, { role: 'model', text: `Error: ${errorMessage}` }]);
        } finally {
            setIsChatLoading(false);
        }
    };

    return (
        <div className="animate-fade-in-up max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-indigo-300">Orchestrator Dialogue</h2>
                <p className="mt-2 text-lg text-indigo-200/80 max-w-3xl mx-auto">
                    Engage in a direct, stateful conversation with the master Orchestrator AI, the central nervous system of the Nexus project.
                </p>
            </div>

            <div className="bg-gray-800/50 border border-indigo-500/20 rounded-lg shadow-2xl shadow-indigo-500/10 backdrop-blur-sm h-[70vh] flex flex-col">
                {/* Message History */}
                <div ref={chatContainerRef} className="flex-1 p-6 overflow-y-auto space-y-6">
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'model' && <NexusIcon className="w-8 h-8 flex-shrink-0 mt-1 text-indigo-400" />}
                            <div className={`max-w-lg p-4 rounded-xl ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                                <p className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }}></p>
                            </div>
                        </div>
                    ))}
                    {isChatLoading && (
                        <div className="flex items-start gap-4 justify-start">
                            <NexusIcon className="w-8 h-8 flex-shrink-0 mt-1 text-indigo-400" />
                            <div className="max-w-lg p-4 rounded-xl bg-gray-700 text-gray-200 flex items-center">
                                <Spinner className="w-5 h-5" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Message Input */}
                <div className="p-4 bg-gray-900/50 border-t border-indigo-500/20">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                        <input
                            type="text"
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            placeholder="Query the Orchestrator..."
                            disabled={isChatLoading}
                            className="w-full p-3 bg-gray-800 border border-indigo-700/50 rounded-lg text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300"
                        />
                        <button
                            type="submit"
                            disabled={isChatLoading || !currentMessage.trim()}
                            className="p-3 text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900/50 disabled:text-gray-400 disabled:cursor-not-allowed rounded-lg transition-colors"
                            aria-label="Send message"
                        >
                            <SendIcon className="w-6 h-6" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
