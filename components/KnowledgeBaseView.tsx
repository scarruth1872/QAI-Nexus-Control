import React from 'react';
import KnowledgeCore from './KnowledgeCore';
import KnowledgeBaseMonitor from './KnowledgeBaseMonitor';
import CosmicCalibrator from './CosmicCalibrator';
import UnifiedFieldAssessment from './UnifiedFieldAssessment';
import { useAppState } from '../contexts/AppContext.tsx';

const KnowledgeBaseView: React.FC = () => {
    const { agentChats } = useAppState();
    return (
        <div className="knowledge-base-grid">
            <div className="kb-main"><KnowledgeCore agentChats={agentChats} /></div>
            <div className="kb-side">
                <KnowledgeBaseMonitor />
                <CosmicCalibrator />
                <UnifiedFieldAssessment />
            </div>
        </div>
    );
};

export default KnowledgeBaseView;
