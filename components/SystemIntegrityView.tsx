
import React, { useState } from 'react';
import { EthicalGovernancePanel } from './EthicalGovernancePanel';
import { ResilienceModule } from './ResilienceModule';
import { SystemStatus, ResilienceAnalysis } from '../types';
import { runResilienceAnalysis } from '../services/geminiService';
import { ComputeResourceMonitor } from './ComputeResourceMonitor';

interface SystemIntegrityViewProps {
    systemStatus: SystemStatus;
}

export const SystemIntegrityView: React.FC<SystemIntegrityViewProps> = ({ systemStatus }) => {
    const [resilienceResult, setResilienceResult] = useState<ResilienceAnalysis | null>(null);
    const [isResilienceLoading, setIsResilienceLoading] = useState(false);
    const [isPsharmActive, setIsPsharmActive] = useState(false);

    const handleRunResilienceAnalysis = async () => {
        setIsResilienceLoading(true);
        setResilienceResult(null);
        try {
            const res = await runResilienceAnalysis();
            setResilienceResult(res);
            setIsPsharmActive(true);
        } catch (error) {
            console.error("Resilience analysis failed:", error);
        } finally {
            setIsResilienceLoading(false);
        }
    };
    
    return (
        <div className="space-y-12">
            <ComputeResourceMonitor />
            <EthicalGovernancePanel alignmentStatus={systemStatus.alignmentStatus} />
            <ResilienceModule
                onInitiate={handleRunResilienceAnalysis}
                result={resilienceResult}
                isLoading={isResilienceLoading}
                isUpgraded={isPsharmActive}
            />
        </div>
    );
};
