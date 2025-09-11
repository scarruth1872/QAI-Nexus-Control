
import React, { useState, useEffect } from 'react';
import { Mission, SystemStatus, DGMOptimization, OrchestrationLogEntry, LogEntryType, ResilienceAnalysis } from '../types';
import { SystemStatusDashboard } from './SystemStatusDashboard';
import { ComputeResourceMonitor } from './ComputeResourceMonitor';
import { OrchestrationMonitor } from './OrchestrationMonitor';
import { EthicalGovernancePanel } from './EthicalGovernancePanel';
import { DgmPanel } from './DgmPanel';
import { ResilienceModule } from './ResilienceModule';
import { runSelfOptimization, runResilienceAnalysis } from '../services/geminiService';

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
    const [dgmResult, setDgmResult] = useState<DGMOptimization | null>(null);
    const [isDgmLoading, setIsDgmLoading] = useState(false);
    const [resilienceResult, setResilienceResult] = useState<ResilienceAnalysis | null>(null);
    const [isResilienceLoading, setIsResilienceLoading] = useState(false);
    const [orchestrationLog, setOrchestrationLog] = useState<OrchestrationLogEntry[]>([]);

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

    const handleInitiateDgm = async () => {
        setIsDgmLoading(true);
        setDgmResult(null);
        try {
            const result = await runSelfOptimization();
            setDgmResult(result);
        } catch (error) {
            console.error("DGM cycle failed:", error);
        } finally {
            setIsDgmLoading(false);
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

    return (
        <div className="space-y-12">
            <SystemStatusDashboard status={status} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <ComputeResourceMonitor mission={mission} />
                <EthicalGovernancePanel alignmentStatus={status.alignmentStatus} />
            </div>
             <OrchestrationMonitor log={orchestrationLog} />
             <ResilienceModule onInitiate={handleInitiateResilienceScan} result={resilienceResult} isLoading={isResilienceLoading} />
            <DgmPanel onInitiate={handleInitiateDgm} result={dgmResult} isLoading={isDgmLoading} />
        </div>
    );
};
