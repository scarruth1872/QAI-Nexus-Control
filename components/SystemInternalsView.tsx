// Fix: Implemented the SystemInternalsView component as a composite dashboard.
import React from 'react';
import SystemIntegrityView from './SystemIntegrityView';
import QuantumCoreTuning from './QuantumCoreTuning';
import ComputeResourceMonitor from './ComputeResourceMonitor';
import NeuromorphicProcessorModule from './NeuromorphicProcessorModule';
import CognitiveSynthesizer from './CognitiveSynthesizer';
import SkfUpgradeModule from './SkfUpgradeModule';
import ResilienceModule from './ResilienceModule';
import EthicalGovernancePanel from './EthicalGovernancePanel';
import QuantumSecurityModule from './QuantumSecurityModule';
import SelfEvolvingFramework from './SelfEvolvingFramework';
import DgmPanel from './DgmPanel';
import QaeInterface from './QaeInterface';

const SystemInternalsView: React.FC = () => {
    return (
        <div className="system-internals-grid">
            <div className="grid-item-wide"><SystemIntegrityView /></div>
            <div className="grid-item"><QuantumCoreTuning /></div>
            <div className="grid-item"><ComputeResourceMonitor /></div>
            <div className="grid-item"><NeuromorphicProcessorModule /></div>
            <div className="grid-item"><CognitiveSynthesizer /></div>
            <div className="grid-item"><SkfUpgradeModule /></div>
            <div className="grid-item"><ResilienceModule /></div>
            <div className="grid-item"><EthicalGovernancePanel /></div>
            <div className="grid-item"><QuantumSecurityModule /></div>
            <div className="grid-item"><SelfEvolvingFramework /></div>
            <div className="grid-item"><DgmPanel /></div>
            <div className="grid-item"><QaeInterface /></div>
        </div>
    );
};

export default SystemInternalsView;
