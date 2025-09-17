
import React from 'react';
import { AgentPanel } from './AgentPanel';
import { Agent } from '../types';

interface AgentExplorerProps {
    agents: Agent[];
}

export const AgentExplorer: React.FC<AgentExplorerProps> = ({ agents }) => {
    return (
        <div className="animate-fade-in-up">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-indigo-300">Agent Cognitive Explorer</h2>
                <p className="mt-2 text-lg text-indigo-200/80 max-w-3xl mx-auto">
                    Deep dive into the operational parameters and cognitive state of each active agent.
                </p>
            </div>
            {agents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {agents.map(agent => <AgentPanel key={agent.id} agent={agent} />)}
                </div>
            ) : (
                <div className="text-center py-16 bg-gray-800/30 rounded-lg border border-indigo-500/20">
                    <p className="text-indigo-300">No active mission. Deploy agents from Mission Control to begin.</p>
                </div>
            )}
        </div>
    );
};