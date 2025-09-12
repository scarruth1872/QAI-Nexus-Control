import React, { useState } from 'react';
import { QuantumCoreTuning } from './QuantumCoreTuning';
import { SystemOptimization } from './SystemOptimization';
import { SkfUpgradeModule } from './SkfUpgradeModule';
import { MarlTrainingModule } from './MarlTrainingModule';
import { SelfEvolvingFramework } from './SelfEvolvingFramework';
import { QuantumSecurityModule } from './QuantumSecurityModule';
import { NeuromorphicProcessorModule } from './NeuromorphicProcessorModule';
import { Mission, QuantumRefinementResult, SkfUpgradeResult, MarlTrainingResult, SelfEvolvingAlgorithmResult, QuantumSecurityUpgradeResult, NeuromorphicIntegrationResult } from '../types';
import { runQuantumRefinement, runSkfUpgrade, runMarlTraining, runSelfEvolvingFramework, runQuantumSecurityUpgrade, runNeuromorphicIntegration } from '../services/geminiService';

const Phase: React.FC<{ title: string; description: string; children: React.ReactNode }> = ({ title, description, children }) => (
    <div className="animate-fade-in-up">
        <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-indigo-300">{title}</h2>
            <p className="mt-2 text-lg text-indigo-200/80 max-w-3xl mx-auto">{description}</p>
        </div>
        <div className="space-y-8">{children}</div>
    </div>
);

export const StrategicRoadmap: React.FC = () => {
    // State for Phase 1
    const [quantumResult, setQuantumResult] = useState<QuantumRefinementResult | null>(null);
    const [isQuantumLoading, setIsQuantumLoading] = useState(false);

    // State for Phase 2
    const [skfResult, setSkfResult] = useState<SkfUpgradeResult | null>(null);
    const [isSkfLoading, setIsSkfLoading] = useState(false);
    const [isSkfUpgraded, setIsSkfUpgraded] = useState(false);
    const [marlResult, setMarlResult] = useState<MarlTrainingResult | null>(null);
    const [isMarlLoading, setIsMarlLoading] = useState(false);
    const [isMarlUpgraded, setIsMarlUpgraded] = useState(false);

    // State for Phase 3
    const [seafResult, setSeafResult] = useState<SelfEvolvingAlgorithmResult | null>(null);
    const [isSeafLoading, setIsSeafLoading] = useState(false);
    const [isSeafUpgraded, setIsSeafUpgraded] = useState(false);
    const [qscResult, setQscResult] = useState<QuantumSecurityUpgradeResult | null>(null);
    const [isQscLoading, setIsQscLoading] = useState(false);
    const [isQscUpgraded, setIsQscUpgraded] = useState(false);
    const [ncpResult, setNcpResult] = useState<NeuromorphicIntegrationResult | null>(null);
    const [isNcpLoading, setIsNcpLoading] = useState(false);
    const [isNcpUpgraded, setIsNcpUpgraded] = useState(false);

    // Handlers
    const handleQuantumTuning = async () => {
        setIsQuantumLoading(true);
        setQuantumResult(null);
        try {
            const res = await runQuantumRefinement();
            setQuantumResult(res);
        } catch (e) { console.error(e); } finally { setIsQuantumLoading(false); }
    };

    const handleSkfUpgrade = async () => {
        setIsSkfLoading(true);
        setSkfResult(null);
        try {
            const res = await runSkfUpgrade();
            setSkfResult(res);
            setIsSkfUpgraded(true);
        } catch (e) { console.error(e); } finally { setIsSkfLoading(false); }
    };

    const handleMarlTraining = async () => {
        setIsMarlLoading(true);
        setMarlResult(null);
        try {
            const res = await runMarlTraining();
            setMarlResult(res);
            setIsMarlUpgraded(true);
        } catch (e) { console.error(e); } finally { setIsMarlLoading(false); }
    };
    
    const handleSeaf = async () => {
        setIsSeafLoading(true);
        setSeafResult(null);
        try {
            const res = await runSelfEvolvingFramework();
            setSeafResult(res);
            setIsSeafUpgraded(true);
        } catch (e) { console.error(e); } finally { setIsSeafLoading(false); }
    };
    
    const handleQsc = async () => {
        setIsQscLoading(true);
        setQscResult(null);
        try {
            const res = await runQuantumSecurityUpgrade();
            setQscResult(res);
            setIsQscUpgraded(true);
        } catch (e) { console.error(e); } finally { setIsQscLoading(false); }
    };
    
    const handleNcp = async () => {
        setIsNcpLoading(true);
        setNcpResult(null);
        try {
            const res = await runNeuromorphicIntegration();
            setNcpResult(res);
            setIsNcpUpgraded(true);
        } catch (e) { console.error(e); } finally { setIsNcpLoading(false); }
    };


    return (
        <div className="space-y-16">
            <Phase title="Phase 1: Core System Optimization" description="Enhancing the foundational layers of the system for greater efficiency and performance.">
                <QuantumCoreTuning onInitiate={handleQuantumTuning} result={quantumResult} isLoading={isQuantumLoading} />
                {/* SystemOptimization now needs a mission prop, which isn't available here.
                    This is a simplified version for now. A more complex implementation would lift state. */}
                <SystemOptimization mission={null} /> 
            </Phase>

            <Phase title="Phase 2: Knowledge Synthesis & Agent Autonomy" description="Expanding the system's cognitive capabilities and agent independence.">
                <SkfUpgradeModule onInitiate={handleSkfUpgrade} result={skfResult} isLoading={isSkfLoading} isUpgraded={isSkfUpgraded} />
                <MarlTrainingModule onInitiate={handleMarlTraining} result={marlResult} isLoading={isMarlLoading} isUpgraded={isMarlUpgraded} />
            </Phase>
            
            <Phase title="Phase 3: Predictive Self-Improvement & Resilience" description="Implementing advanced modules for autonomous evolution and robust operational integrity.">
                 <SelfEvolvingFramework onInitiate={handleSeaf} result={seafResult} isLoading={isSeafLoading} isUpgraded={isSeafUpgraded} />
                 <QuantumSecurityModule onInitiate={handleQsc} result={qscResult} isLoading={isQscLoading} isUpgraded={isQscUpgraded} />
                 <NeuromorphicProcessorModule onInitiate={handleNcp} result={ncpResult} isLoading={isNcpLoading} isUpgraded={isNcpUpgraded} />
            </Phase>
        </div>
    );
};
