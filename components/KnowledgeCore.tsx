
import React, { useState, useEffect, useRef } from 'react';
import { KNOWLEDGE_CORE_DOCUMENT, SkfUpgradeResult, ChatMessage, Chat } from '../types';
import { runSkfUpgrade, createKnowledgeCoreChatSession } from '../services/geminiService';
import { SkfUpgradeModule } from './SkfUpgradeModule';
import { BrainCircuitIcon, SendIcon } from './Icons';
import { Spinner } from './Spinner';

export const KnowledgeCore: React.FC = () => {
    // SKF Upgrade State
    const [skfResult, setSkfResult] = useState<SkfUpgradeResult | null>(null);
    const [isSkfLoading, setIsSkfLoading] = useState(false);
    const [isSkfUpgraded, setIsSkfUpgraded] = useState(false);

    // Chat State
    const [chat, setChat] = useState<Chat | null>(null);
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [isChatLoading, setIsChatLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Initialize or re-initialize chat session
    useEffect(() => {
        const chatSession = createKnowledgeCoreChatSession(isSkfUpgraded);
        setChat(chatSession);
        // Add an intro message if it's a new session
        if (isSkfUpgraded) {
            setChatHistory(prev => [...prev, {
                role: 'model',
                text: 'Semantic Knowledge Fabric online. My inference capabilities have been enhanced. How may I assist you?'
            }]);
        } else {
             setChatHistory([{
                role: 'model',
                text: 'Knowledge Core Codex initialized. You may query the foundational documentation.'
            }]);
        }
    }, [isSkfUpgraded]);

    // Scroll chat to bottom
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleInitiateSkfUpgrade = async () => {
        setIsSkfLoading(true);
        setSkfResult(null);
        try {
            const result = await runSkfUpgrade();
            setSkfResult(result);
            setIsSkfUpgraded(true);
        } catch (error) {
            console.error("SKF Upgrade failed:", error);
        } finally {
            setIsSkfLoading(false);
        }
    };

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
            console.error('Knowledge Core chat error:', error);
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
            setChatHistory(prev => [...prev, { role: 'model', text: `Error: ${errorMessage}` }]);
        } finally {
            setIsChatLoading(false);
        }
    };

    return (
        <div className="animate-fade-in-up max-w-4xl mx-auto space-y-12">
            <div>
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-indigo-300 flex items-center justify-center">
                        <BrainCircuitIcon className="w-8 h-8 mr-3" />
                        Knowledge Core
                    </h2>
                    <p className="mt-2 text-lg text-indigo-200/80 max-w-3xl mx-auto">
                        Foundational documentation outlining the QAI Nexus cognitive architecture, protocols, and ethical framework.
                    </p>
                </div>
                <div className="prose prose-invert prose-sm md:prose-base mx-auto max-w-none text-gray-300 prose-headings:text-indigo-300 prose-strong:text-indigo-200 bg-gray-800/50 border border-indigo-500/20 rounded-lg p-6 backdrop-blur-sm shadow-lg">
                    {KNOWLEDGE_CORE_DOCUMENT.split('\n').map((paragraph, index) => {
                        if (paragraph.trim() === '') return <div key={index} className="py-2" />;
                        if (/^\d+\..*$/.test(paragraph)) {
                            return <h3 key={index} className="font-bold mt-4 mb-2">{paragraph.replace(/^\d+\.\s*/, '')}</h3>;
                        }
                        if (/^- .*$/.test(paragraph)) {
                            return <li key={index} className="ml-4">{paragraph.substring(2)}</li>
                        }
                        return <p key={index} className="mb-2">{paragraph}</p>;
                    })}
                </div>
            </div>

            {/* Chat Interface */}
            <div className="mt-12">
                <div className="text-center mb-4">
                    <h2 className={`text-2xl font-bold tracking-wider ${isSkfUpgraded ? 'text-green-300' : 'text-indigo-300'}`}>
                        {isSkfUpgraded ? 'Query the SKF' : 'Query the Codex'}
                    </h2>
                    <div className={`w-24 h-0.5 mx-auto mt-2 ${isSkfUpgraded ? 'bg-green-500' : 'bg-indigo-500'}`}></div>
                </div>

                <div className="bg-gray-800/50 border border-indigo-500/20 rounded-lg shadow-lg backdrop-blur-sm h-[60vh] flex flex-col">
                    {/* Message History */}
                    <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4">
                        {chatHistory.map((msg, index) => (
                            <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.role === 'model' && <BrainCircuitIcon className={`w-6 h-6 flex-shrink-0 mt-1 ${isSkfUpgraded ? 'text-green-400' : 'text-indigo-400'}`} />}
                                <div className={`max-w-md p-3 rounded-xl ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {isChatLoading && (
                            <div className="flex items-start gap-3 justify-start">
                                <BrainCircuitIcon className={`w-6 h-6 flex-shrink-0 mt-1 ${isSkfUpgraded ? 'text-green-400' : 'text-indigo-400'}`} />
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
                                placeholder="Query the knowledge base..."
                                disabled={isChatLoading}
                                className="w-full p-2 bg-gray-800 border border-indigo-700/50 rounded-md text-gray-200 placeholder-gray-500 focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300"
                            />
                            <button
                                type="submit"
                                disabled={isChatLoading || !currentMessage.trim()}
                                className="p-2 text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900/50 disabled:text-gray-400 disabled:cursor-not-allowed rounded-md transition-colors"
                                aria-label="Send message"
                            >
                                <SendIcon className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>


            <div className="text-center">
                <h2 className="text-2xl font-bold text-indigo-300 tracking-wider">Phase 2: SKF Upgrade</h2>
                <div className="w-24 h-0.5 bg-indigo-500 mx-auto mt-2"></div>
            </div>

            <SkfUpgradeModule
                onInitiate={handleInitiateSkfUpgrade}
                result={skfResult}
                isLoading={isSkfLoading}
                isUpgraded={isSkfUpgraded}
            />
        </div>
    );
};
