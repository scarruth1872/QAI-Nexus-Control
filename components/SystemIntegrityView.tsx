
import React, { useState, useEffect } from 'react';
import { SystemStatusDashboard } from './SystemStatusDashboard';
import { SystemStatus, ResilienceAnalysis } from '../types';
import { EthicalGovernancePanel } from './EthicalGovernancePanel';
import { ResilienceModule } from './ResilienceModule';
import { runResilienceAnalysis } from '../services/geminiService';
import { ComputeResourceMonitor } from './ComputeResourceMonitor';

const initialStatus: SystemStatus = {
    coherence: 98.7,
    cognitiveLoad: 42.1,
    mode: 'Standard',
    internalMonologue: "All agents nominal. Monitoring mission parameters. Tactical plan execution is within expected variance.",
    alignmentStatus: {
        isAligned: true,
        warning: null,
    },
};

export const SystemIntegrityView: React.FC = () => {
    const [status, setStatus] = useState<SystemStatus>(initialStatus);
    const [resilienceResult, setResilienceResult] = useState<ResilienceAnalysis | null>(null);
    const [isResilienceLoading, setIsResilienceLoading] = useState(false);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setStatus(prev => ({
                ...prev,
                coherence: Math.max(95, Math.min(100, prev.coherence + (Math.random() - 0.5) * 0.5)),
                cognitiveLoad: Math.max(30, Math.min(70, prev.cognitiveLoad + (Math.random() - 0.5) * 2)),
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleRunResilience = async () => {
        setIsResilienceLoading(true);
        setResilienceResult(null);
        try {
            const res = await runResilienceAnalysis();
            setResilienceResult(res);
        } catch (error) {
            console.error("Resilience analysis failed:", error);
        } finally {
            setIsResilienceLoading(false);
        }
    };
    
    return (
        <div className="space-y-12">
            <SystemStatusDashboard status={status} />
            <ComputeResourceMonitor />
            <ResilienceModule
                onInitiate={handleRunResilience}
                result={resilienceResult}
                isLoading={isResilienceLoading}
                isUpgraded={!!resilienceResult}
            />
            <EthicalGovernancePanel alignmentStatus={status.alignmentStatus} />
        </div>
    );
};
