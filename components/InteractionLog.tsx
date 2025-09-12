import React, { useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { NexusIcon } from './Icons';

export const InteractionLog: React.FC<{ messages: ChatMessage[] }> = ({ messages }) => {
    const endOfMessagesRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(scrollToBottom, [messages]);

    return (
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {messages.map(message => (
                <div key={message.id} className={`flex items-start gap-3 animate-fade-in-up ${message.sender === 'user' ? 'justify-end' : ''}`}>
                    {message.sender === 'orchestrator' && (
                        <div className="w-8 h-8 flex-shrink-0 bg-indigo-500/20 rounded-full flex items-center justify-center">
                            <NexusIcon className="w-5 h-5 text-indigo-300" />
                        </div>
                    )}
                    <div className={`max-w-md p-3 rounded-lg ${
                        message.sender === 'user' 
                            ? 'bg-indigo-600 text-white rounded-br-none' 
                            : 'bg-gray-700/70 text-gray-200 rounded-bl-none'
                    }`}>
                        <p className="text-sm">{message.text}</p>
                    </div>
                </div>
            ))}
            <div ref={endOfMessagesRef} />
        </div>
    );
};
