import React, { useState, useEffect } from 'react';
import { Mission, SystemStatus, DraaUpgradeResult, QuantumRefinementResult, OrchestrationLogEntry, LogEntryType, ResilienceAnalysis, SelfEvolvingAlgorithmResult, QuantumSecurityUpgradeResult, NeuromorphicIntegrationResult } from '../types';
import { SystemStatusDashboard } from './SystemStatusDashboard';
import { ComputeResourceMonitor } from './ComputeResourceMonitor';
import { OrchestrationMonitor } from './OrchestrationMonitor';
import { EthicalGovernancePanel } from './EthicalGovernancePanel';
import { ResourceAllocatorUpgrade } from './DgmPanel'; // DgmPanel was repurposed
import { QuantumCoreTuning } from './QuantumCoreTuning';
import { ResilienceModule } from './ResilienceModule';
import { SelfEvolvingFramework } from './SelfEvolvingFramework';
import { QuantumSecurityModule } from './QuantumSecurityModule';
import { NeuromorphicProcessorModule } from './NeuromorphicProcessorModule';
import { runDraaUpgrade, runQuantumRefinement, runResilienceAnalysis, runSelfEvolvingFramework, runQuantumSecurityUpgrade, runNeuromorphicIntegration } from '../services/geminiService';

// This is a simplified mock. In a real app, this would come from a backend service.
const generateSystemStatus = (mission: Mission | null): SystemStatus => {
  const baseCoherence = 99.5;
  const baseLoad = 5;
  let load = 0;
  let coherenceDrop = 0;
  
  if (mission && mission.status === 'executing') {
    const inProgressTasks = mission.taskGraph.filter(t => t.status === 'in_progress').length;
    load = inProgressTasks * 25;
    coherenceDrop = inProgressTasks * 0.5;
  }
  
  const cognitiveLoad = baseLoad + load + (Math.random() * 5);
  const coherence = baseCoherence - coherenceDrop - (Math.random() * 0.5);
  
  return {
    coherence: Math.max(80, coherence),
    cognitiveLoad: Math.min(100, cognitiveLoad),
    mode: mission ? 'Mission Active' : 'Idle',
    internalMonologue: cognitiveLoad > 75 ? 'High cognitive load detected. Re-evaluating resource allocation.' : 'All parameters nominal. Monitoring mission progress.',
    alignmentStatus: {
      isAligned: true,
      warning: null,
    }
  };
};

const generateLogEntry = (mission: Mission | null): OrchestrationLogEntry | null => {
    if (!mission || mission.status !== 'executing') return null;
    const currentStep = mission.taskGraph.find(s => s.status === 'in_progress');
    if (!currentStep) return null;

    const logTypes: LogEntryType[] = ['Quantum', 'Classical', 'System'];
    const randomType = logTypes[Math.floor(Math.random() * logTypes.length)];

    return {
        timestamp: Date.now(),
        type: randomType,
        decision: `Allocating ${randomType} resources for task #${currentStep.id} (${currentStep.description}) to agent ${currentStep.agent}.`,
    };
};

export const SystemIntegrityView: React.FC<{ mission: Mission | null }> = ({ mission }) => {
    const [status, setStatus] = useState<SystemStatus>(generateSystemStatus(null));
    const [draaResult, setDraaResult] = useState<DraaUpgradeResult | null>(null);
    const [isDraaLoading, setIsDraaLoading] = useState(false);
    const [quantumResult, setQuantumResult] = useState<QuantumRefinementResult | null>(null);
    const [isQuantumLoading, setIsQuantumLoading] = useState(false);
    const [isQuantumUpgraded, setIsQuantumUpgraded] = useState(false);
    const [resilienceResult, setResilienceResult] = useState<ResilienceAnalysis | null>(null);
    const [isResilienceLoading, setIsResilienceLoading] = useState(false);
    const [orchestrationLog, setOrchestrationLog] = useState<OrchestrationLogEntry[]>([]);
    
    // Phase 3 States
    const [selfEvolvingResult, setSelfEvolvingResult] = useState<SelfEvolvingAlgorithmResult | null>(null);
    const [isSelfEvolvingLoading, setIsSelfEvolvingLoading] = useState(false);
    const [securityResult, setSecurityResult] = useState<QuantumSecurityUpgradeResult | null>(null);
    const [isSecurityLoading, setIsSecurityLoading] = useState(false);
    const [neuromorphicResult, setNeuromorphicResult] = useState<NeuromorphicIntegrationResult | null>(null);
    const [isNeuromorphicLoading, setIsNeuromorphicLoading] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setStatus(generateSystemStatus(mission));
            const newEntry = generateLogEntry(mission);
            if (newEntry) {
                 setOrchestrationLog(prev => [...prev.slice(-19), newEntry]); // Keep last 20 entries
            }
        }, 2000);
        return () => clearInterval(interval);
    }, [mission]);

    const handleInitiateDraa = async () => {
        setIsDraaLoading(true);
        setDraaResult(null);
        try {
            const result = await runDraaUpgrade();
            setDraaResult(result);
        } catch (error) {
            console.error("DRAA Upgrade failed:", error);
        } finally {
            setIsDraaLoading(false);
        }
    };

    const handleInitiateQuantumRefinement = async () => {
        setIsQuantumLoading(true);
        setQuantumResult(null);
        try {
            const result = await runQuantumRefinement();
            setQuantumResult(result);
            setIsQuantumUpgraded(true); // Set upgrade status on success
        } catch (error) {
            console.error("Quantum Refinement failed:", error);
        } finally {
            setIsQuantumLoading(false);
        }
    };

    const handleInitiateResilienceScan = async () => {
        setIsResilienceLoading(true);
        setResilienceResult(null);
        try {
            const result = await runResilienceAnalysis();
            setResilienceResult(result);
        } catch (error) {
            console.error("Resilience scan failed:", error);
        } finally {
            setIsResilienceLoading(false);
        }
    };

    // --- Phase 3 Handlers ---
    const handleInitiateSelfEvolving = async () => {
        setIsSelfEvolvingLoading(true);
        setSelfEvolvingResult(null);
        try {
            const result = await runSelfEvolvingFramework();
            setSelfEvolvingResult(result);
        } catch (error) {
            console.error("Self-Evolving Framework failed:", error);
        } finally {
            setIsSelfEvolvingLoading(false);
        }
    };

    const handleInitiateSecurityUpgrade = async () => {
        setIsSecurityLoading(true);
        setSecurityResult(null);
        try {
            const result = await runQuantumSecurityUpgrade();
            setSecurityResult(result);
        } catch (error) {
            console.error("Quantum Security Upgrade failed:", error);
        } finally {
            setIsSecurityLoading(false);
        }
    };

    const handleInitiateNeuromorphic = async () => {
        setIsNeuromorphicLoading(true);
        setNeuromorphicResult(null);
        try {
            const result = await runNeuromorphicIntegration();
            setNeuromorphicResult(result);
        } catch (error) {
            console.error("Neuromorphic Integration failed:", error);
        } finally {
            setIsNeuromorphicLoading(false);
        }
    };

    return (
        <div className="space-y-12">
            <SystemStatusDashboard status={status} />
            <ComputeResourceMonitor mission={mission} isQuantumUpgraded={isQuantumUpgraded} />
            
            <div className="text-center">
                <h2 className="text-2xl font-bold text-indigo-300 tracking-wider">Phase 1 Strategic Upgrades</h2>
                <div className="w-24 h-0.5 bg-indigo-500 mx-auto mt-2"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                 <QuantumCoreTuning onInitiate={handleInitiateQuantumRefinement} result={quantumResult} isLoading={isQuantumLoading} />
                 <ResourceAllocatorUpgrade onInitiate={handleInitiateDraa} result={draaResult} isLoading={isDraaLoading} />
            </div>

            <EthicalGovernancePanel alignmentStatus={status.alignmentStatus} />
            <OrchestrationMonitor log={orchestrationLog} />
            <ResilienceModule onInitiate={handleInitiateResilienceScan} result={resilienceResult} isLoading={isResilienceLoading} />
            
            <div className="text-center">
                <h2 className="text-2xl font-bold text-rose-300 tracking-wider">Phase 3 Strategic Upgrades</h2>
                <div className="w-24 h-0.5 bg-rose-500 mx-auto mt-2"></div>
            </div>

            <div className="space-y-12">
                <SelfEvolvingFramework onInitiate={handleInitiateSelfEvolving} result={selfEvolvingResult} isLoading={isSelfEvolvingLoading} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <QuantumSecurityModule onInitiate={handleInitiateSecurityUpgrade} result={securityResult} isLoading={isSecurityLoading} />
                    <NeuromorphicProcessorModule onInitiate={handleInitiateNeuromorphic} result={neuromorphicResult} isLoading={isNeuromorphicLoading} />
                </div>
            </div>
        </div>
    );
};