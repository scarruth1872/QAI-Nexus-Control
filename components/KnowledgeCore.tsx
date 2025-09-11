
import React, { useState, useRef, useEffect } from 'react';
// FIX: Corrected all import paths to be relative.
import { KNOWLEDGE_CORE_DOCUMENT, ChatMessage } from '../types';
import { queryKnowledgeCore } from '../services/geminiService';
import { BookIcon, SendIcon, NexusIcon } from './Icons';
import { Spinner } from './Spinner';

const DocumentDisplay: React.FC = () => {
    const formattedText = KNOWLEDGE_CORE_DOCUMENT.split('\n').map((paragraph, index) => {
        const trimmed = paragraph.trim();
        if (trimmed.match(/^\d+\./)) { // Section headers like "1. Executive Summary"
            return <h2 key={index} className="text-2xl font-bold text-indigo-300 mt-8 mb-4">{trimmed.substring(trimmed.indexOf(' ') + 1)}</h2>;
        }
        if (trimmed.match(/^[A-Z][a-zA-Z\s]+:/) && trimmed.length < 100) { // Sub-headers
             return <h3 key={index} className="text-xl font-semibold text-indigo-200 mt-6 mb-3">{trimmed}</h3>;
        }
        if(trimmed.length === 0) {
            return null;
        }
        return <p key={index} className="mb-4 text-indigo-100/80 leading-relaxed">{trimmed}</p>;
    });

    return (
        <div className="prose prose-invert max-w-none">
            {formattedText}
        </div>
    );
};

export const KnowledgeCore: React.FC = () => {
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

     useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
     }, [chatHistory]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoading || !currentMessage.trim()) return;

        const messageToSend = currentMessage;
        setCurrentMessage('');
        setIsLoading(true);
        setChatHistory(prev => [...prev, { role: 'user', text: messageToSend }]);

        try {
            const responseText = await queryKnowledgeCore(messageToSend);
            setChatHistory(prev => [...prev, { role: 'model', text: responseText }]);
        } catch (error) {
            console.error('Knowledge Core query error:', error);
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
            setChatHistory(prev => [...prev, { role: 'model', text: `Error: ${errorMessage}` }]);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="animate-fade-in-up max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-indigo-300">System Knowledge Core</h2>
                <p className="mt-2 text-lg text-indigo-200/80 max-w-3xl mx-auto">
                    Review the foundational framework of the QAI Nexus system and query its core intelligence.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Document Viewer */}
                <div className="lg:col-span-2 bg-gray-800/50 border border-indigo-500/20 rounded-lg p-6 shadow-lg backdrop-blur-sm h-[75vh] overflow-y-auto">
                   <DocumentDisplay />
                </div>

                {/* Chat Interface */}
                <div className="lg:col-span-1 bg-gray-800/50 border border-indigo-500/20 rounded-lg shadow-lg backdrop-blur-sm h-[75vh] flex flex-col">
                    <div className="p-4 border-b border-indigo-500/20 flex items-center">
                        <BookIcon className="w-6 h-6 mr-3 text-indigo-400"/>
                        <h3 className="text-lg font-semibold text-indigo-300">Query the Codex</h3>
                    </div>
                    
                    {/* Message History */}
                    <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4">
                         {chatHistory.map((msg, index) => (
                            <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.role === 'model' && <NexusIcon className="w-6 h-6 flex-shrink-0 mt-1 text-indigo-400" />}
                                <div className={`max-w-xs p-3 rounded-xl ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                                    <p className="text-sm" dangerouslySetInnerHTML={{__html: msg.text.replace(/\n/g, '<br />')}}></p>
                                </div>
                            </div>
                        ))}
                         {isLoading && (
                            <div className="flex items-start gap-3 justify-start">
                                <NexusIcon className="w-6 h-6 flex-shrink-0 mt-1 text-indigo-400" />
                                <div className="max-w-md p-3 rounded-xl bg-gray-700 text-gray-200 flex items-center">
                                    <Spinner className="w-4 h-4" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Message Input */}
                    <div className="p-2 bg-gray-900/50 border-t border-indigo-500/10">
                        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                            <input
                                type="text"
                                value={currentMessage}
                                onChange={(e) => setCurrentMessage(e.target.value)}
                                placeholder="Ask about the framework..."
                                disabled={isLoading}
                                className="w-full p-2 bg-gray-800 border border-indigo-700/50 rounded-md text-gray-200 placeholder-gray-500 focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !currentMessage.trim()}
                                className="p-2 text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900/50 disabled:text-gray-400 disabled:cursor-not-allowed rounded-md transition-colors"
                                aria-label="Send message"
                            >
                                <SendIcon className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
