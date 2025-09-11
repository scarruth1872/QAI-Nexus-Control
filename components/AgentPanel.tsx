

import React, { useState, useEffect, useRef } from 'react';
import { Chat } from '@google/genai';
// FIX: Corrected all import paths to be relative.
import { AgentType, ProbeType, ChatMessage, LoggedChatMessage } from '../types';
import { probeAgentCognitiveFunction, createAgentChatSession } from '../services/geminiService';
import { ScienceIcon, SocietyIcon, PlanetIcon, InductionIcon, ReasoningIcon, RecursionIcon, SendIcon } from './Icons';
import { Spinner } from './Spinner';
import { StructuredResultDisplay } from './StructuredResultDisplay';

const agentDetails = {
  [AgentType.SCIENTIFIC_DISCOVERY]: { name: 'Scientific Discovery Agent', icon: ScienceIcon, color: 'text-cyan-400', description: 'Specializes in analyzing complex datasets, formulating hypotheses, and deriving insights from scientific literature.' },
  [AgentType.SOCIETAL_MODELING]: { name: 'Societal Modeling Agent', icon: SocietyIcon, color: 'text-rose-400', description: 'Focuses on modeling human behavior, social dynamics, and the ethical implications of technological advancements.' },
  [AgentType.PLANETARY_EXPLORATION]: { name: 'Planetary Exploration Agent', icon: PlanetIcon, color: 'text-amber-400', description: 'Designed for mission planning, resource logistics, and navigating and analyzing extraterrestrial environments.' },
};

const ProbeButton: React.FC<{ onClick: () => void, disabled: boolean, children: React.ReactNode }> = ({ onClick, disabled, children }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex-1 flex items-center justify-center p-3 bg-gray-700/50 hover:bg-gray-700 disabled:bg-gray-800 disabled:cursor-not-allowed disabled:text-gray-500 text-indigo-300 rounded-md transition-colors duration-200"
    >
        {children}
    </button>
);

export const AgentPanel: React.FC<{ 
    agentType: AgentType, 
    onProbe: (agentType: AgentType, probeType: ProbeType) => void,
    onNewInteraction: (logEntry: LoggedChatMessage) => void,
}> = ({ agentType, onProbe, onNewInteraction }) => {
  const [probeResponse, setProbeResponse] = useState('');
  const [isProbeLoading, setIsProbeLoading] = useState<ProbeType | null>(null);

  const [chat, setChat] = useState<Chat | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  const details = agentDetails[agentType];
  const Icon = details.icon;
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChat(createAgentChatSession(agentType));
  }, [agentType]);

  useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);


  const handleProbe = async (probeType: ProbeType) => {
    setIsProbeLoading(probeType);
    setProbeResponse('');
    onProbe(agentType, probeType);

    try {
      const res = await probeAgentCognitiveFunction(agentType, probeType);
      setProbeResponse(res);
    } catch (error) {
      console.error('Error probing agent:', error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      setProbeResponse(JSON.stringify({ error: "Failed to get response from agent.", details: errorMessage }));
    } finally {
      setIsProbeLoading(null);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isChatLoading || !currentMessage.trim() || !chat) return;

    const messageToSend = currentMessage;
    setCurrentMessage('');
    setIsChatLoading(true);
    
    const userMessage: ChatMessage = { role: 'user', text: messageToSend };
    setChatHistory(prev => [...prev, userMessage]);
    onNewInteraction({ ...userMessage, agentType });

    try {
        const response = await chat.sendMessage({ message: messageToSend });
        const modelMessage: ChatMessage = { role: 'model', text: response.text };
        setChatHistory(prev => [...prev, modelMessage]);
        onNewInteraction({ ...modelMessage, agentType });
    } catch (error) {
        console.error('Chat error:', error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during chat.";
        const modelMessage: ChatMessage = { role: 'model', text: `Error: ${errorMessage}` };
        setChatHistory(prev => [...prev, modelMessage]);
        onNewInteraction({ ...modelMessage, agentType });
    } finally {
        setIsChatLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/50 border border-indigo-500/20 rounded-lg p-6 shadow-lg shadow-indigo-900/20 backdrop-blur-sm">
      {/* Agent Header */}
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Icon className={`w-12 h-12 ${details.color}`} />
        </div>
        <div className="ml-6 flex-grow">
          <h3 className={`font-bold text-xl ${details.color}`}>{details.name}</h3>
          <p className="text-indigo-200/80 mt-1 text-sm">{details.description}</p>
        </div>
      </div>
      
      {/* Cognitive Probes Section */}
      <div className="mt-6">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-300 mb-3">Cognitive Probes</h4>
        <div className="flex space-x-3">
           <ProbeButton onClick={() => handleProbe(ProbeType.INDUCTION)} disabled={!!isProbeLoading}>
               {isProbeLoading === ProbeType.INDUCTION ? <Spinner className="w-5 h-5" /> : <InductionIcon className="w-5 h-5 mr-2" />}
               <span className="text-sm font-medium">Induction</span>
           </ProbeButton>
           <ProbeButton onClick={() => handleProbe(ProbeType.REASONING)} disabled={!!isProbeLoading}>
               {isProbeLoading === ProbeType.REASONING ? <Spinner className="w-5 h-5" /> : <ReasoningIcon className="w-5 h-5 mr-2" />}
               <span className="text-sm font-medium">Reasoning</span>
           </ProbeButton>
           <ProbeButton onClick={() => handleProbe(ProbeType.RECURSION)} disabled={!!isProbeLoading}>
               {isProbeLoading === ProbeType.RECURSION ? <Spinner className="w-5 h-5" /> : <RecursionIcon className="w-5 h-5 mr-2" />}
               <span className="text-sm font-medium">Recursion</span>
           </ProbeButton>
        </div>
      </div>

      {(isProbeLoading || probeResponse) && (
        <div className="mt-6 pt-4 border-t border-indigo-500/10 min-h-[10rem]">
           <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-300 mb-2">System Readout</h4>
           {isProbeLoading && <div className="flex justify-center items-center h-full"><Spinner /></div>}
           {probeResponse && !isProbeLoading && (
              <div className="bg-black/20 p-2 rounded-md">
                <StructuredResultDisplay result={probeResponse} />
              </div>
           )}
        </div>
      )}

      {/* Direct Interaction / Chat Section */}
       <div className="mt-6 pt-6 border-t border-indigo-500/20">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-300 mb-3">Direct Interaction</h4>
            <div className="bg-black/30 rounded-lg border border-indigo-500/10 overflow-hidden flex flex-col h-96">
                {/* Message History */}
                <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4">
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'model' && <Icon className={`w-6 h-6 flex-shrink-0 mt-1 ${details.color}`} />}
                            <div className={`max-w-md p-3 rounded-xl ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                                <p className="text-sm">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isChatLoading && (
                        <div className="flex items-start gap-3 justify-start">
                            <Icon className={`w-6 h-6 flex-shrink-0 mt-1 ${details.color}`} />
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
                            placeholder="Send a message..."
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
    </div>
  );
};