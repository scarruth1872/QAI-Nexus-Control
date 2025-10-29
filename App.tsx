import React, { useState } from 'react';
import LcarsLayout from './components/LcarsLayout';
import CommandDeck from './components/CommandDeck';
import SystemInternalsView from './components/SystemInternalsView';
import StrategicOpsView from './components/StrategicOpsView';
import KnowledgeBaseView from './components/KnowledgeBaseView';
import LiveCommsView from './components/live/LiveCommsView';

import ControlRoomView from './components/controlroom/ControlRoomView';
import MainRoboticsBayView from './components/mainbay/MainRoboticsBayView';
import FabricationWorkshopView from './components/fabrication/FabricationWorkshopView';
import HriLabView from './components/hri/HriLabView';
import ElectronicsLabView from './components/electronics/ElectronicsLabView';
import LogisticsZoneView from './components/logistics/LogisticsZoneView';

import Alpha1Dashboard from './components/atoi/Alpha1Dashboard';
import Beta2Dashboard from './components/logistics/Beta2Dashboard';
import Gamma3Dashboard from './components/nanomaterials/NanomaterialsDashboard';
import Delta4Dashboard from './components/biointegration/BioIntegrationDashboard';
import Epsilon5Dashboard from './components/quantum/QuantumResearcherDashboard';
import Zeta6Dashboard from './components/decentralized/Zeta6Dashboard';
import Eta7Dashboard from './components/robotics/Eta7Dashboard';
import Theta8Dashboard from './components/neuromorphic/Theta8Dashboard';

import FinalReportModal from './components/FinalReportModal';

import { Agent } from './types';
import { AppStateProvider, useAppState } from './contexts/AppContext.tsx';

const AppContent = () => {
    const [activeView, setActiveView] = useState('Command Deck');
    const [specializedDashboard, setSpecializedDashboard] = useState<Agent | null>(null);

    const { 
        mission, 
        isReportModalOpen, 
        setIsReportModalOpen,
        agents
    } = useAppState();
    
    const handleOpenSpecializedDashboard = (agent: Agent) => {
        setSpecializedDashboard(agent);
    };
    
    const handleReturnToComms = () => {
        setSpecializedDashboard(null);
    }

    const renderSpecializedDashboard = () => {
        if (!specializedDashboard) return null;
        switch (specializedDashboard.specializedDashboard) {
            case 'ATOI': return <Alpha1Dashboard agent={specializedDashboard} onReturn={handleReturnToComms} />;
            case 'Logistics': return <Beta2Dashboard agent={specializedDashboard} onReturn={handleReturnToComms} />;
            case 'Nanomaterials': return <Gamma3Dashboard agent={specializedDashboard} onReturn={handleReturnToComms} />;
            case 'Bio-Integration': return <Delta4Dashboard agent={specializedDashboard} onReturn={handleReturnToComms} />;
            case 'Quantum': return <Epsilon5Dashboard agent={specializedDashboard} onReturn={handleReturnToComms} />;
            case 'Decentralized': return <Zeta6Dashboard agent={specializedDashboard} onReturn={handleReturnToComms} />;
            case 'Robotics': return <Eta7Dashboard agent={specializedDashboard} onReturn={handleReturnToComms} />;
            case 'Neuromorphic': return <Theta8Dashboard agent={specializedDashboard} onReturn={handleReturnToComms} />;
            default: return <div className="module-panel"><h3>Specialized Dashboard for {specializedDashboard.name} not implemented.</h3><button onClick={handleReturnToComms}>Return</button></div>;
        }
    }

    const renderActiveView = () => {
        if (specializedDashboard) {
            return renderSpecializedDashboard();
        }
        switch (activeView) {
            case 'Command Deck':
                return <CommandDeck onOpenSpecializedDashboard={handleOpenSpecializedDashboard} />;
            case 'System Internals': return <SystemInternalsView />;
            case 'Strategic Ops': return <StrategicOpsView />;
            case 'Knowledge Base': return <KnowledgeBaseView />;
            case 'Live Comms': return <LiveCommsView />;
            case 'Control Room': return <ControlRoomView />;
            case 'Robotics Bay': return <MainRoboticsBayView />;
            case 'Fabrication': return <FabricationWorkshopView />;
            case 'HRI Lab': return <HriLabView />;
            case 'Electronics Lab': return <ElectronicsLabView />;
            case 'Logistics Zone': return <LogisticsZoneView />;
            default: return <div>View not found</div>;
        }
    };

    return (
        <>
            <LcarsLayout activeView={activeView} onViewChange={setActiveView}>
                {renderActiveView()}
            </LcarsLayout>
            {mission?.report && (
                <FinalReportModal 
                    isOpen={isReportModalOpen}
                    onClose={() => setIsReportModalOpen(false)}
                    report={mission.report}
                />
            )}
        </>
    );
};

const App = () => {
    return (
        <AppStateProvider>
            <AppContent />
        </AppStateProvider>
    );
};


export default App;
