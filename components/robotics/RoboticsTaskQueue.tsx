import React, { useState } from 'react';
import { RoboticsOperationalState, DelegatedTaskResult, SimulationResult, BioAssayResult } from '../../types';
import StatusIndicator from './ExecutionCommand'; // Repurposed to StatusIndicator
import Spinner from '../Spinner';

interface IntegrationProtocolsPanelProps {
    state: RoboticsOperationalState;
    onDispatchFabrication: (prompt: string) => void;
    isFabricationLoading: boolean;
    fabricationResult: DelegatedTaskResult<SimulationResult>;
    onDispatchBio: (prompt: string) => void;
    isBioLoading: boolean;
    bioResult: DelegatedTaskResult<BioAssayResult>;
}

const IntegrationProtocolsPanel: React.FC<IntegrationProtocolsPanelProps> = ({ 
    state,
    onDispatchFabrication,
    isFabricationLoading,
    fabricationResult,
    onDispatchBio,
    isBioLoading,
    bioResult 
}) => {
    const [fabricationPrompt, setFabricationPrompt] = useState('A conductive, transparent polymer for flexible displays.');
    const [bioPrompt, setBioPrompt] = useState('Assess the biocompatibility of graphene foam for neural implants.');

    return (
        <div>
            {/* Execution Arm Operations */}
            <div className="eta-op-section">
                <h4>Execution Arm Operations</h4>
                {state.executionProtocols.map(p => (
                    <div key={p.interface} className="protocol-item">
                        <span className="interface-name">[↔️ INTERFACE] {p.interface}:</span>
                        <span className="protocol-details">Active Protocol: {p.activeProtocol} {p.details && `(${p.details})`}</span>
                    </div>
                ))}

                <div className="execution-subsection">
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="sub-panel-title">Dispatch Fabrication Task</p>
                            <textarea
                                value={fabricationPrompt}
                                onChange={(e) => setFabricationPrompt(e.target.value)}
                                disabled={isFabricationLoading}
                                rows={2}
                            />
                            <button className="w-full mt-1" onClick={() => onDispatchFabrication(fabricationPrompt)} disabled={isFabricationLoading || !fabricationPrompt.trim()}>
                                {isFabricationLoading ? 'Executing...' : 'Dispatch to Gamma-3'}
                            </button>
                            {isFabricationLoading && <Spinner />}
                             {fabricationResult.status === 'COMPLETED' && fabricationResult.data && (
                                <div className="module-response mt-2">
                                    <strong>Complete:</strong> {fabricationResult.data.materialName}
                                </div>
                            )}
                        </div>
                        <div>
                            <p className="sub-panel-title">Dispatch Bio-Protocol Task</p>
                             <textarea
                                value={bioPrompt}
                                onChange={(e) => setBioPrompt(e.target.value)}
                                disabled={isBioLoading}
                                rows={2}
                            />
                            <button className="w-full mt-1" onClick={() => onDispatchBio(bioPrompt)} disabled={isBioLoading || !bioPrompt.trim()}>
                                {isBioLoading ? 'Executing...' : 'Dispatch to Delta-4'}
                            </button>
                            {isBioLoading && <Spinner />}
                            {bioResult.status === 'COMPLETED' && bioResult.data && (
                                <div className="module-response mt-2">
                                    <strong>Complete:</strong> Biocompatibility: {bioResult.data.biocompatibility.assessment}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Perception Input Feeds */}
            <div className="eta-op-section">
                <h4>Perception Input Feeds</h4>
                 {state.perceptionFeeds.map(p => (
                    <div key={p.destination} className="protocol-item">
                       <StatusIndicator status={p.status} text={`[➡️ ${p.status}] ${p.destination}`} />
                    </div>
                ))}
                 <div className="metrics-group">
                    Data Integrity: {state.perceptionFeeds[0].dataIntegrity}% (Real-time anomaly detection and redundant data paths)
                </div>
            </div>

            {/* Safety Critical Systems */}
            <div className="eta-op-section">
                <h4>Safety Critical Systems (AGI Ethics & Safety Modulator)</h4>
                 {state.safetySystems.map(s => (
                     <div key={s.name} className="protocol-item">
                        <StatusIndicator status={s.status} text={`[${s.status === 'COMPLIANT' ? '⚖️' : s.status === 'ARMED' ? '⛔' : '🛡️' } ${s.status}] ${s.name}`} />
                         <span className="protocol-details">{s.details}</span>
                    </div>
                 ))}
            </div>
        </div>
    );
};

export default IntegrationProtocolsPanel;