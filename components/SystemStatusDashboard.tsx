
import React, { useState, useEffect } from 'react';
import { SystemStatus } from '../types';
import { AlertIcon } from './Icons';

const MetricBar: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
    <div>
        <div className="flex justify-between items-baseline">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">{label}</span>
            <span className={`font-mono font-semibold text-lg ${color}`}>{value.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-700/50 rounded-full h-2 mt-1">
            <div
                className={`h-2 rounded-full ${color.replace('text-', 'bg-')}`}
                style={{ width: `${value}%`, transition: 'width 0.5s ease-in-out' }}
            ></div>
        </div>
    </div>
);

const Typewriter: React.FC<{ text: string }> = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        setDisplayedText(''); // Reset on new text
        let i = 0;
        const intervalId = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(prev => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(intervalId);
            }
        }, 20); // Adjust speed here

        return () => clearInterval(intervalId);
    }, [text]);

    return <span>{displayedText}</span>;
};


export const SystemStatusDashboard: React.FC<{ status: SystemStatus }> = ({ status }) => {
    return (
        <div className="animate-fade-in-up bg-gray-800/50 border border-indigo-500/20 rounded-lg p-4 md:p-6 mb-8 backdrop-blur-sm shadow-lg shadow-indigo-900/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                {/* Metrics */}
                <div className="md:col-span-1 space-y-4">
                    <MetricBar label="System Coherence" value={status.coherence} color="text-cyan-400" />
                    <MetricBar label="Cognitive Load" value={status.cognitiveLoad} color="text-amber-400" />
                </div>

                {/* Status & Monologue */}
                <div className="md:col-span-2">
                    <div className="flex justify-between items-center mb-2">
                         <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-300">Operational Mode</h3>
                         <div className="px-3 py-1 text-sm font-bold text-gray-900 bg-indigo-300 rounded-full">
                            {status.mode}
                         </div>
                    </div>
                    <div className="bg-black/30 p-3 rounded-md min-h-[4rem] text-indigo-200/90 text-sm font-mono italic">
                        &gt; <Typewriter text={status.internalMonologue} />
                    </div>
                    
                    {/* Safety & Alignment */}
                    <div className="mt-4">
                        <div 
                            className={`flex items-center p-2 rounded-md transition-colors duration-300 ${status.alignmentStatus.isAligned 
                                ? 'bg-green-500/10 text-green-300' 
                                : 'bg-rose-500/20 text-rose-300 animate-pulse'}`}
                        >
                            {status.alignmentStatus.isAligned ? (
                                <span className="w-4 h-4 rounded-full bg-green-400 mr-3 flex-shrink-0"></span>
                            ) : (
                                <AlertIcon className="w-5 h-5 mr-3 flex-shrink-0 text-rose-400" />
                            )}
                            <div className="text-xs">
                                <span className="font-bold mr-2">Safety & Alignment:</span>
                                {status.alignmentStatus.warning || 'Nominal'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};