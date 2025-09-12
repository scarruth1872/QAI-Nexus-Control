import React, { useState } from 'react';
import { OrchestrationMonitor } from './OrchestrationMonitor';
import { InteractionLog } from './InteractionLog';
import { ChatMessage, OrchestrationLogEntry } from '../types';
import { Spinner } from './Spinner';
import { getOrchestratorResponse } from '../services/geminiService';

export const OrchestratorChat: React.FC<{log: OrchestrationLogEntry[]}> = ({ log }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;
        
        const userMessage: ChatMessage = {
            id: String(Date.now()),
            sender: 'user',
            text: input,
            timestamp: Date.now()
        };
        
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // This history format is a placeholder. A real implementation would be more complex.
            const history: any[] = messages.map(m => ({
                role: m.sender === 'user' ? 'user' : 'model',
                parts: [{ text: m.text }]
            }));

            const responseText = await getOrchestratorResponse(history, input);
            const orchestratorMessage: ChatMessage = {
                id: String(Date.now() + 1),
                sender: 'orchestrator',
                text: responseText,
                timestamp: Date.now()
            };
            setMessages(prev => [...prev, orchestratorMessage]);

        } catch (error) {
            console.error("Orchestrator response error:", error);
             const errorMessage: ChatMessage = {
                id: String(Date.now() + 1),
                sender: 'orchestrator',
                text: "Apologies, I am currently unable to process your request.",
                timestamp: Date.now()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="animate-fade-in-up grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-indigo-300">Orchestrator Command &amp; Control</h2>
                    <p className="mt-2 text-lg text-indigo-200/80 max-w-3xl mx-auto">
                        Interface directly with the Nexus Orchestrator to issue commands or query system status.
                    </p>
                </div>
                <div className="bg-gray-800/50 border border-indigo-500/20 rounded-lg shadow-lg backdrop-blur-sm h-[60vh] flex flex-col p-4">
                    <InteractionLog messages={messages} />
                    <div className="mt-4 flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                            placeholder="Type your command..."
                            className="flex-1 p-3 bg-gray-900/70 border border-indigo-700/50 rounded-l-md text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300"
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-r-md disabled:bg-indigo-900/50 disabled:cursor-not-allowed transition-colors"
                        >
                           {isLoading ? <Spinner className="w-5 h-5" /> : 'Send'}
                        </button>
                    </div>
                </div>
            </div>
            <div className="lg:col-span-1">
                 <OrchestrationMonitor log={log} />
            </div>
        </div>
    );
};
