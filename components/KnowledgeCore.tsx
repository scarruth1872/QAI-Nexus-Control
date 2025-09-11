
import React, { useState } from 'react';
import { CognitiveSynthesizer } from './CognitiveSynthesizer';
import { GenerativeSimulationEngine } from './GenerativeSimulationEngine';
import { SkfUpgradeModule } from './SkfUpgradeModule';
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
        <div className="animate-fade-in-up space-y-12">
            <SkfUpgradeModule 
                onInitiate={handleSkfUpgrade}
                result={skfResult}
                isLoading={isSkfLoading}
                isUpgraded={isSkfUpgraded}
            />
            <CognitiveSynthesizer isSkfActive={isSkfUpgraded} />
            <GenerativeSimulationEngine />
        </div>
    );
};
