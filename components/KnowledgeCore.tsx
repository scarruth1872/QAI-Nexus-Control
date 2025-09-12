import React, { useState } from 'react';
import { SkfUpgradeModule } from './SkfUpgradeModule';
import { KnowledgeBaseMonitor } from './KnowledgeBaseMonitor';
import { CognitiveSynthesizer } from './CognitiveSynthesizer';
import { GenerativeSimulationEngine } from './GenerativeSimulationEngine';
import { SkfUpgradeResult } from '../types';
import { runSkfUpgrade } from '../services/geminiService';

export const KnowledgeCore: React.FC = () => {
    const [skfResult, setSkfResult] = useState<SkfUpgradeResult | null>(null);
    const [isSkfLoading, setIsSkfLoading] = useState(false);
    const [isSkfUpgraded, setIsSkfUpgraded] = useState(false);

    const handleSkfUpgrade = async () => {
        setIsSkfLoading(true);
        setSkfResult(null);
        try {
            const res = await runSkfUpgrade();
            setSkfResult(res);
            setIsSkfUpgraded(true);
        } catch (error) {
            console.error("SKF upgrade failed:", error);
        } finally {
            setIsSkfLoading(false);
        }
    };

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <KnowledgeBaseMonitor isSkfActive={isSkfUpgraded} />
                <SkfUpgradeModule
                    onInitiate={handleSkfUpgrade}
                    result={skfResult}
                    isLoading={isSkfLoading}
                    isUpgraded={isSkfUpgraded}
                />
            </div>
            <CognitiveSynthesizer isSkfActive={isSkfUpgraded} />
            <GenerativeSimulationEngine />
        </div>
    );
};
