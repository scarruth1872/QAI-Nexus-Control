import React, { useState } from 'react';
import { Mission, AdaptiveOptimizationResult, ContextualWeightingResult, ObjectiveWeights } from '../types';
import { runContextualReWeighting, runAdaptiveOptimization } from '../services/geminiService';
import { Spinner } from './Spinner';
import { ScaleIcon, RecursionIcon } from './Icons';

const defaultWeights: ObjectiveWeights = {
    speed: 0.34,
    resilience: 0.33,
    efficiency: 0.33,
};

const WeightBar: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
    <div>
        <div className="flex justify-between items-baseline">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">{label}</span>
            <span className={`font-mono font-semibold text-lg ${color}`}>{ (value * 100).toFixed(0) }%</span>
        </div>
        <div className="w-full bg-gray-700/50 rounded-full h-2 mt-1">
            <div
                className={`h-2 rounded-full ${color.replace('text-', 'bg-')}`}
                style={{ width: `${value * 100}%`, transition: 'width 0.5s ease-in-out' }}
            ></div>
        </div>
    </div>
);

export const SystemOptimization: React.FC<{ mission: Mission | null }> = ({ mission }) => {
    const [weights, setWeights] = useState<ObjectiveWeights>(defaultWeights);
    const [contextResult, setContextResult] = useState<ContextualWeightingResult | null>(null);
    const [optimizationResult, setOptimizationResult] = useState<AdaptiveOptimizationResult | null>(null);
    const [isWeighting, setIsWeighting] = useState(false);
    const [isOptimizing, setIsOptimizing] = useState(false);

    const handleReWeight = async () => {
        if (!mission) return;
        setIsWeighting(true);
        setContextResult(null);
        setOptimizationResult(null);
        try {
            const result = await runContextualReWeighting(mission.objective, mission.status);
            setWeights(result.newWeights);
            setContextResult(result);
        } catch (error) {
            console.error("Contextual re-weighting failed:", error);
        } finally {
            setIsWeighting(false);
        }
    };

    const handleOptimize = async () => {
        setIsOptimizing(true);
        setOptimizationResult(null);
        try {
            const result = await runAdaptiveOptimization(weights);
            setOptimizationResult(result);
        } catch (error) {
            console.error("Adaptive optimization failed:", error);
        } finally {
            setIsOptimizing(false);
        }
    };

    return (
        <div className="animate-fade-in-up bg-gray-800/50 border border-indigo-500/20 rounded-lg p-6 backdrop-blur-sm shadow-lg shadow-indigo-900/20">
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-indigo-300">Adaptive Optimization Module</h3>
                <p className="mt-2 text-indigo-200/80 max-w-3xl mx-auto text-sm">
                    Dynamically adjust objective weights based on real-time mission context, then run a self-optimization cycle.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Weights & Controls */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-indigo-200 text-center">Objective Weights</h4>
                    <WeightBar label="Speed" value={weights.speed} color="text-cyan-400" />
                    <WeightBar label="Resilience" value={weights.resilience} color="text-green-400" />
                    <WeightBar label="Efficiency" value={weights.efficiency} color="text-amber-400" />
                    <div className="flex flex-col space-y-3 pt-4">
                        <button
                            onClick={handleReWeight}
                            disabled={!mission || isWeighting || isOptimizing}
                            className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900/50 disabled:cursor-not-allowed"
                        >
                            {isWeighting ? <Spinner className="w-5 h-5" /> : <><ScaleIcon className="w-5 h-5 mr-2"/> Analyze & Re-Weight</>}
                        </button>
                         <button
                            onClick={handleOptimize}
                            disabled={isWeighting || isOptimizing}
                            className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 disabled:bg-rose-900/50 disabled:cursor-not-allowed"
                        >
                             {isOptimizing ? <Spinner className="w-5 h-5" /> : <><RecursionIcon className="w-5 h-5 mr-2"/> Run Optimization Cycle</>}
                        </button>
                    </div>
                </div>
                
                {/* Results */}
                <div className="space-y-4">
                    {contextResult && (
                         <div className="p-3 bg-black/30 rounded-md animate-fade-in-up">
                            <h5 className="font-semibold text-indigo-300 text-sm mb-1">Contextual Analysis</h5>
                            <p className="text-xs text-gray-300">{contextResult.analysis}</p>
                        </div>
                    )}
                    {optimizationResult && (
                         <div className="p-3 bg-black/30 rounded-md animate-fade-in-up">
                            <h5 className="font-semibold text-rose-300 text-sm mb-1">Optimization Proposal</h5>
                            <p className="text-xs text-gray-300 font-mono p-2 bg-gray-900/50 rounded-md">{optimizationResult.proposal}</p>
                        </div>
                    )}
                    {!contextResult && !optimizationResult && (
                         <div className="p-3 text-center text-sm text-gray-500 h-full flex items-center justify-center">
                            Awaiting analysis...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
