
import React from 'react';
import { MarlTrainingResult } from '../types';
import { Spinner } from './Spinner';
import { SocietyIcon, CheckCircleIcon } from './Icons';

interface MarlTrainingModuleProps {
    onInitiate: () => void;
    result: MarlTrainingResult | null;
    isLoading: boolean;
    isUpgraded: boolean;
}

export const MarlTrainingModule: React.FC<MarlTrainingModuleProps> = ({ onInitiate, result, isLoading, isUpgraded }) => {
    return (
        <div className="animate-fade-in-up bg-gray-800/50 border border-amber-500/20 rounded-lg p-6 backdrop-blur-sm shadow-lg shadow-amber-900/20">
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-amber-300">Multi-Agent Reinforcement Learning</h3>
                <p className="mt-2 text-amber-200/80 max-w-3xl mx-auto text-sm">
                    Run a MARL training cycle to allow agents to discover novel collaborative strategies and improve collective problem-solving efficiency.
                </p>
            </div>

            <div className="flex justify-center mb-6">
                <button
                    onClick={onInitiate}
                    disabled={isLoading || isUpgraded}
                    className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-amber-600 hover:bg-amber-700 disabled:bg-amber-900/50 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <Spinner className="w-5 h-5 mr-2" />
                            Training...
                        </>
                    ) : isUpgraded ? (
                         <>
                            <CheckCircleIcon className="w-5 h-5 mr-2 text-green-400" />
                            Strategy Learned
                        </>
                    ) : (
                        <>
                            <SocietyIcon className="w-5 h-5 mr-2" />
                            Initiate Training Cycle
                        </>
                    )}
                </button>
            </div>
            
            {result && !isLoading && (
                 <div className="space-y-3 animate-fade-in-up">
                    <div className="bg-gray-900/50 border border-amber-500/20 rounded-lg p-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-300 mb-2">Discovered Collaborative Strategy</h4>
                        <p className="text-gray-200 text-sm font-mono">{result.strategy}</p>
                    </div>
                     <div className="bg-gray-900/50 border border-amber-500/20 rounded-lg p-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-300 mb-2">Projected Performance Gain</h4>
                        <p className="text-green-400 font-semibold text-sm">{result.performanceGain}</p>
                    </div>
                 </div>
            )}
        </div>
    );
};