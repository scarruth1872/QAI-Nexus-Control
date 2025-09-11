import React, { useState } from 'react';
import { AgentPanel } from './AgentPanel';
import { AgentType, ProbeType, LoggedChatMessage } from '../types';
import { InteractionLog } from './InteractionLog';

export const AgentExplorer: React.FC = () => {
    const [interactionLog, setInteractionLog] = useState<LoggedChatMessage[]>([]);

    const handleProbe = (agentType: AgentType, probeType: ProbeType) => {
        console.log(`Probing ${agentType} with ${probeType}`);
        // This is where you might add a log entry for the probe action itself
    };

    const handleNewInteraction = (logEntry: LoggedChatMessage) => {
        setInteractionLog(prev => [...prev, logEntry]);
    };

    return (
        <div className="animate-fade-in-up">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-indigo-300">Cognitive Agent Explorer</h2>
                <p className="mt-2 text-lg text-indigo-200/80 max-w-3xl mx-auto">
                    Directly probe and interact with the core cognitive functions of each specialized agent.
                </p>
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                <AgentPanel 
                    agentType={AgentType.SCIENTIFIC_DISCOVERY} 
                    onProbe={handleProbe}
                    onNewInteraction={handleNewInteraction}
                />
                <AgentPanel 
                    agentType={AgentType.SOCIETAL_MODELING}
                    onProbe={handleProbe}
                    onNewInteraction={handleNewInteraction}
                />
                <AgentPanel
                    agentType={AgentType.PLANETARY_EXPLORATION}
                    onProbe={handleProbe}
                    onNewInteraction={handleNewInteraction}
                />
            </div>
             <InteractionLog log={interactionLog} />
        </div>
    );
};
