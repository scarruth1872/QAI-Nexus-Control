
import React from 'react';
import { KnowledgeBaseMonitor } from './KnowledgeBaseMonitor';
import { CognitiveSynthesizer } from './CognitiveSynthesizer';
import { GenerativeSimulationEngine } from './GenerativeSimulationEngine';

interface KnowledgeCoreProps {
    isSkfActive: boolean;
}

export const KnowledgeCore: React.FC<KnowledgeCoreProps> = ({ isSkfActive }) => {
    return (
        <div className="space-y-12">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-indigo-300">Knowledge Core Interface</h2>
                <p className="mt-2 text-lg text-indigo-200/80 max-w-3xl mx-auto">
                    Manage, synthesize, and simulate data within the system's central knowledge repository.
                </p>
            </div>
            <KnowledgeBaseMonitor isSkfActive={isSkfActive} />
            <CognitiveSynthesizer />
            <GenerativeSimulationEngine />
        </div>
    );
};
