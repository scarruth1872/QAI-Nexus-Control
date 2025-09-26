import React from 'react';
import SystemOptimization from './SystemOptimization';
import QuantumCoreTuning from './QuantumCoreTuning';
import NeuromorphicProcessorModule from './NeuromorphicProcessorModule';
import ResilienceModule from './ResilienceModule';
import QuantumSecurityModule from './QuantumSecurityModule';
import CognitiveSynthesizer from './CognitiveSynthesizer';
import SystemIntegrityView from './SystemIntegrityView';
import ComputeResourceMonitor from './ComputeResourceMonitor';
import QaeInterface from './QaeInterface';
import UnifiedFieldAssessment from './UnifiedFieldAssessment';
import FabricatorModule from './FabricatorModule';
import CosmicCalibrator from './CosmicCalibrator';
import ControlConsole from './ControlConsole';
// Fix: Corrected import path for types.
import { Agent } from '../types';

interface SystemInternalsViewProps {
    agents: Agent[];
}

const SystemInternalsView: React.FC<SystemInternalsViewProps> = ({ agents }) => {
    return (
        <div className="view-grid">
            <SystemOptimization />
            <QuantumCoreTuning />
            <NeuromorphicProcessorModule />
            <ResilienceModule />
            <QuantumSecurityModule />
            <CognitiveSynthesizer />
            <SystemIntegrityView />
            <ComputeResourceMonitor />
            <QaeInterface />
            <UnifiedFieldAssessment />
            <FabricatorModule />
            <CosmicCalibrator />
            <ControlConsole agents={agents} />
        </div>
    );
};

export default SystemInternalsView;