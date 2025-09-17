import React, { useState } from 'react';
import { SkfUpgradeModule } from './SkfUpgradeModule';
import { MarlTrainingModule } from './MarlTrainingModule';
import { SelfEvolvingFramework } from './SelfEvolvingFramework';
import { QuantumSecurityModule } from './QuantumSecurityModule';
import { NeuromorphicProcessorModule } from './NeuromorphicProcessorModule';
import { 
    runSkfUpgrade, 
    runMarlTraining, 
    runSelfEvolvingAlgorithm, 
    runQuantumSecurityUpgrade, 
    runNeuromorphicIntegration 
} from '../services/geminiService';
import { 
    SkfUpgradeResult, 
    MarlTrainingResult, 
    SelfEvolvingAlgorithmResult, 
    QuantumSecurityUpgradeResult, 
    NeuromorphicIntegrationResult 
} from '../types';

interface StrategicRoadmapProps {
    onSkfUpgrade: () => void;
}

export const StrategicRoadmap: React.FC<StrategicRoadmapProps> = ({ onSkfUpgrade }) => {
    // SKF state
    const [skfResult, setSkfResult] = useState<SkfUpgradeResult | null>(null);
    const [isSkfLoading, setIsSkfLoading] = useState(false);
    const [isSkfUpgraded, setIsSkfUpgraded] = useState(false);

    // MARL state
    const [marlResult, setMarlResult] = useState<MarlTrainingResult | null>(null);
    const [isMarlLoading, setIsMarlLoading] = useState(false);
    const [isMarlUpgraded, setIsMarlUpgraded] = useState(false);

    // Self-Evolving state
    const [selfEvolvingResult, setSelfEvolvingResult] = useState<SelfEvolvingAlgorithmResult | null>(null);
    const [isSelfEvolvingLoading, setIsSelfEvolvingLoading] = useState(false);
    const [isSelfEvolvingUpgraded, setIsSelfEvolvingUpgraded] = useState(false);

    // Quantum Security state
    const [quantumSecurityResult, setQuantumSecurityResult] = useState<QuantumSecurityUpgradeResult | null>(null);
    const [isQuantumSecurityLoading, setIsQuantumSecurityLoading] = useState(false);
    const [isQuantumSecurityUpgraded, setIsQuantumSecurityUpgraded] = useState(false);
    
    // Neuromorphic state
    const [neuromorphicResult, setNeuromorphicResult] = useState<NeuromorphicIntegrationResult | null>(null);
    const [isNeuromorphicLoading, setIsNeuromorphicLoading] = useState(false);
    const [isNeuromorphicUpgraded, setIsNeuromorphicUpgraded] = useState(false);


    const handleSkfUpgrade = async () => {
        setIsSkfLoading(true);
        try {
            const res = await runSkfUpgrade();
            setSkfResult(res);
            setIsSkfUpgraded(true);
            onSkfUpgrade();
        } catch (error) { console.error("SKF upgrade failed", error); }
        finally { setIsSkfLoading(false); }
    };
    
    const handleMarlTraining = async () => {
        setIsMarlLoading(true);
        try {
            const res = await runMarlTraining();
            setMarlResult(res);
            setIsMarlUpgraded(true);
        } catch (error) { console.error("MARL training failed", error); }
        finally { setIsMarlLoading(false); }
    };

    const handleSelfEvolving = async () => {
        setIsSelfEvolvingLoading(true);
        try {
            const res = await runSelfEvolvingAlgorithm();
            setSelfEvolvingResult(res);
            setIsSelfEvolvingUpgraded(true);
        } catch (error) { console.error("Self-evolving algorithm failed", error); }
        finally { setIsSelfEvolvingLoading(false); }
    };
    
    const handleQuantumSecurityUpgrade = async () => {
        setIsQuantumSecurityLoading(true);
        try {
            const res = await runQuantumSecurityUpgrade();
            setQuantumSecurityResult(res);
            setIsQuantumSecurityUpgraded(true);
        } catch (error) { console.error("Quantum Security upgrade failed", error); }
        finally { setIsQuantumSecurityLoading(false); }
    };
    
    const handleNeuromorphicIntegration = async () => {
        setIsNeuromorphicLoading(true);
        try {
            const res = await runNeuromorphicIntegration();
            setNeuromorphicResult(res);
            setIsNeuromorphicUpgraded(true);
        } catch (error) { console.error("Neuromorphic integration failed", error); }
        finally { setIsNeuromorphicLoading(false); }
    };


    return (
        <div className="animate-fade-in-up space-y-12">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-indigo-300">Strategic Roadmap & System Evolution</h2>
                <p className="mt-2 text-lg text-indigo-200/80 max-w-3xl mx-auto">
                    Initiate long-term strategic upgrades to evolve the core capabilities of the Nexus system.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SkfUpgradeModule 
                    onInitiate={handleSkfUpgrade} 
                    result={skfResult} 
                    isLoading={isSkfLoading} 
                    isUpgraded={isSkfUpgraded} 
                />
                <MarlTrainingModule
                    onInitiate={handleMarlTraining}
                    result={marlResult}
                    isLoading={isMarlLoading}
                    isUpgraded={isMarlUpgraded}
                />
                <SelfEvolvingFramework
                    onInitiate={handleSelfEvolving}
                    result={selfEvolvingResult}
                    isLoading={isSelfEvolvingLoading}
                    isUpgraded={isSelfEvolvingUpgraded}
                />
                <QuantumSecurityModule 
                    onInitiate={handleQuantumSecurityUpgrade}
                    result={quantumSecurityResult}
                    isLoading={isQuantumSecurityLoading}
                    isUpgraded={isQuantumSecurityUpgraded}
                />
                <NeuromorphicProcessorModule 
                    onInitiate={handleNeuromorphicIntegration}
                    result={neuromorphicResult}
                    isLoading={isNeuromorphicLoading}
                    isUpgraded={isNeuromorphicUpgraded}
                />
            </div>
        </div>
    );
};
