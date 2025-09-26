import React from 'react';
import KnowledgeCore from './KnowledgeCore';
import ResearchModule from './ResearchModule';
import XaiModule from './XaiModule';
import InteractionLog from './InteractionLog';
import KnowledgeBaseMonitor from './KnowledgeBaseMonitor';
import EthicalGovernancePanel from './EthicalGovernancePanel';
// Fix: Corrected import path for types.
import { Mission, AgentChats } from '../types';

interface KnowledgeBaseViewProps {
    mission: Mission | null;
    agentChats: AgentChats;
}

const KnowledgeBaseView: React.FC<KnowledgeBaseViewProps> = ({ mission, agentChats }) => {
    return (
        <div className="view-grid">
            <KnowledgeCore agentChats={agentChats} />
            <ResearchModule />
            <XaiModule mission={mission} />
            <InteractionLog />
            <KnowledgeBaseMonitor />
            <EthicalGovernancePanel />
        </div>
    );
};

export default KnowledgeBaseView;