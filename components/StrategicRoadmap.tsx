
import React, { useState } from 'react';
import { SystemOptimization } from './SystemOptimization';
import { QuantumCoreTuning } from './QuantumCoreTuning';
import { NeuromorphicProcessorModule } from './NeuromorphicProcessorModule';
import { QuantumSecurityModule } from './QuantumSecurityModule';
import { SelfEvolvingFramework } from './SelfEvolvingFramework';
import { MarlTrainingModule } from './MarlTrainingModule';
import { 
    DGMOptimization, 
    QuantumRefinementResult, 
    NeuromorphicIntegrationResult, 
    QuantumSecurityUpgradeResult,
    SelfEvolvingAlgorithmResult,
    MarlTrainingResult
} from '../types';
import { 
    runDgmOptimization, 
    runQuantumCoreTuning, 
    runNeuromorphicIntegration,
    runQuantumSecurityUpgrade,
    runSelfEvolvingAlgorithm,
    runMarlTraining
} from '../services/geminiService';

export const StrategicRoadmap: React.FC = () => {
    const [dgmResult, setDgmResult] = useState<DGMOptimization | null>(null);
    const [isDgmLoading, setIsDgmLoading] = useState(false);

    const [qCoreResult, setQCoreResult] = useState<QuantumRefinementResult | null>(null);
    const [isQCoreLoading, setIsQCoreLoading] = useState(false);
    
    const [ncpResult, setNcpResult] = useState<NeuromorphicIntegrationResult | null>(null);
    const [isNcpLoading, setIsNcpLoading] = useState(false);
    const [isNcpUpgraded, setIsNcpUpgraded] = useState(false);

    const [qsResult, setQsResult] = useState<QuantumSecurityUpgradeResult | null>(null);
    const [isQsLoading, setIsQsLoading] = useState(false);
    
    const [seafResult, setSeafResult] = useState<SelfEvolvingAlgorithmResult | null>(null);
    const [isSeafLoading, setIsSeafLoading] = useState(false);

    const [marlResult, setMarlResult] = useState<MarlTrainingResult | null>(null);
    const [isMarlLoading, setIsMarlLoading] = useState(false);


    const handleDgm = async () => {
        setIsDgmLoading(true);
        setDgmResult(null);
        try {
            const res = await runDgmOptimization();
            setDgmResult(res);
        } finally {
            setIsDgmLoading(false);
        }
    };

    const handleQCore = async () => {
        setIsQCoreLoading(true);
        setQCoreResult(null);
        try {
            const res = await runQuantumCoreTuning();
            setQCoreResult(res);
        } finally {
            setIsQCoreLoading(false);
        }
    };

    const handleNcp = async () => {
        setIsNcpLoading(true);
        setNcpResult(null);
        try {
            const res = await runNeuromorphicIntegration();
            setNcpResult(res);
            setIsNcpUpgraded(true);
        } finally {
            setIsNcpLoading(false);
        }
    };

     const handleQs = async () => {
        setIsQsLoading(true);
        setQsResult(null);
        try {
            const res = await runQuantumSecurityUpgrade();
            setQsResult(res);
        } finally {
            setIsQsLoading(false);
        }
    };

    const handleSeaf = async () => {
        setIsSeafLoading(true);
        setSeafResult(null);
        try {
            const res = await runSelfEvolvingAlgorithm();
            setSeafResult(res);
        } finally {
            setIsSeafLoading(false);
        }
    };

    const handleMarl = async () => {
        setIsMarlLoading(true);
        setMarlResult(null);
        try {
            const res = await runMarlTraining();
            setMarlResult(res);
        } finally {
            setIsMarlLoading(false);
        }
    };


    return (
        <div className="space-y-12">
            <SystemOptimization 
                onInitiate={handleDgm}
                result={dgmResult}
                isLoading={isDgmLoading}
            />
            <QuantumCoreTuning
                onInitiate={handleQCore}
                result={qCoreResult}
                isLoading={isQCoreLoading}
            />
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <NeuromorphicProcessorModule
                    onInitiate={handleNcp}
                    result={ncpResult}
                    isLoading={isNcpLoading}
                    isUpgraded={isNcpUpgraded}
                />
                <QuantumSecurityModule
                    onInitiate={handleQs}
                    result={qsResult}
                    isLoading={isQsLoading}
                    isUpgraded={!!qsResult}
                />
                 <SelfEvolvingFramework
                    onInitiate={handleSeaf}
                    result={seafResult}
                    isLoading={isSeafLoading}
                    isUpgraded={!!seafResult}
                />
                <MarlTrainingModule
                    onInitiate={handleMarl}
                    result={marlResult}
                    isLoading={isMarlLoading}
                    isUpgraded={!!marlResult}
                />
            </div>
        </div>
    );
};
