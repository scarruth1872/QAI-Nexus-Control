import React, { useState } from 'react';
import { SkfUpgradeModule } from './SkfUpgradeModule';
import { MarlTrainingModule } from './MarlTrainingModule';
import { SelfEvolvingFramework } from './SelfEvolvingFramework';
import { QuantumSecurityModule } from './QuantumSecurityModule';
import { NeuromorphicProcessorModule } from './NeuromorphicProcessorModule';
import { QuantumCoreTuning } from './QuantumCoreTuning';
import * as gemini from '../services/geminiService';
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
    const [skf, setSkf] = useState<{res: SkfUpgradeResult | null, loading: boolean, upgraded: boolean}>({res: null, loading: false, upgraded: false});
    const [marl, setMarl] = useState<{res: MarlTrainingResult | null, loading: boolean, upgraded: boolean}>({res: null, loading: false, upgraded: false});
    const [sef, setSef] = useState<{res: SelfEvolvingAlgorithmResult | null, loading: boolean, upgraded: boolean}>({res: null, loading: false, upgraded: false});
    const [qsm, setQsm] = useState<{res: QuantumSecurityUpgradeResult | null, loading: boolean, upgraded: boolean}>({res: null, loading: false, upgraded: false});
    const [npm, setNpm] = useState<{res: NeuromorphicIntegrationResult | null, loading: boolean, upgraded: boolean}>({res: null, loading: false, upgraded: false});

    const createHandler = <T,>(setter: React.Dispatch<React.SetStateAction<{res: T | null, loading: boolean, upgraded: boolean}>>, serviceCall: () => Promise<T>, onComplete?: () => void) => async () => {
        setter(s => ({...s, loading: true, res: null}));
        try {
            const res = await serviceCall();
            setter({res, loading: false, upgraded: true});
            if (onComplete) onComplete();
        } catch (error) {
            console.error("Upgrade failed:", error);
            setter(s => ({...s, loading: false}));
        }
    };

    return (
        <div className="animate-fade-in-up">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-indigo-300">Strategic Roadmap</h2>
                <p className="mt-2 text-lg text-indigo-200/80 max-w-3xl mx-auto">
                    Initiate next-generation upgrades to enhance system capabilities and performance across multiple domains.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SkfUpgradeModule
                    onInitiate={createHandler(setSkf, gemini.runSkfUpgrade, onSkfUpgrade)}
                    result={skf.res}
                    isLoading={skf.loading}
                    isUpgraded={skf.upgraded}
                />
                <QuantumCoreTuning />
                <MarlTrainingModule
                    onInitiate={createHandler(setMarl, gemini.runMarlTraining)}
                    result={marl.res}
                    isLoading={marl.loading}
                    isUpgraded={marl.upgraded}
                />
                <SelfEvolvingFramework
                    onInitiate={createHandler(setSef, gemini.runSelfEvolvingAlgorithm)}
                    result={sef.res}
                    isLoading={sef.loading}
                    isUpgraded={sef.upgraded}
                />
                <QuantumSecurityModule
                    onInitiate={createHandler(setQsm, gemini.runQuantumSecurityUpgrade)}
                    result={qsm.res}
                    isLoading={qsm.loading}
                    isUpgraded={qsm.upgraded}
                />
                <NeuromorphicProcessorModule
                    onInitiate={createHandler(setNpm, gemini.runNeuromorphicIntegration)}
                    result={npm.res}
                    isLoading={npm.loading}
                    isUpgraded={npm.upgraded}
                />
            </div>
        </div>
    );
};