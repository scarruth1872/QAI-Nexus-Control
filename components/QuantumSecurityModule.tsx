import React from 'react';
import { QuantumSecurityUpgradeResult } from '../types';
import { Spinner } from './Spinner';
import { LockClosedIcon } from './Icons';

interface QuantumSecurityModuleProps {
    onInitiate: () => void;
    result: QuantumSecurityUpgradeResult | null;
    isLoading: boolean;
}

const ResultCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-900/50 border border-rose-500/20 rounded-lg p-4">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-rose-300 mb-2">{title}</h4>
        <div className="text-gray-200 text-sm">{children}</div>
    </div>
);

export const QuantumSecurityModule: React.FC<QuantumSecurityModuleProps> = ({ onInitiate, result, isLoading }) => {
    return (
        <div className="animate-fade-in-up bg-gray-800/50 border border-rose-500/20 rounded-lg p-6 backdrop-blur-sm shadow-lg shadow-rose-900/20">
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-rose-300">Quantum-Secure Communication</h3>
                <p className="mt-2 text-rose-200/80 max-w-3xl mx-auto text-sm">
                    Implement quantum-resistant cryptography protocols across all internal and external communication channels to fortify data integrity.
                </p>
            </div>

            <div className="flex justify-center mb-6">
                <button
                    onClick={onInitiate}
                    disabled={isLoading}
                    className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-rose-600 hover:bg-rose-700 disabled:bg-rose-900/50 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <Spinner className="w-5 h-5 mr-2" />
                            Hardening Channels...
                        </>
                    ) : (
                        <>
                            <LockClosedIcon className="w-5 h-5 mr-2" />
                            Initiate Security Upgrade
                        </>
                    )}
                </button>
            </div>
            
            {result && !isLoading && (
                 <div className="space-y-3 animate-fade-in-up">
                    <ResultCard title="Upgrade Summary">
                        <p className="font-mono text-xs">{result.upgradeSummary}</p>
                    </ResultCard>
                     <ResultCard title="Protocols Implemented">
                        <ul className="list-disc list-inside space-y-1 font-mono text-xs">
                            {result.protocolsImplemented.map((cap, i) => <li key={i}>{cap}</li>)}
                        </ul>
                    </ResultCard>
                     <ResultCard title="Threat Vector Mitigated">
                        <p className="font-mono text-xs">{result.threatVectorMitigated}</p>
                    </ResultCard>
                    <ResultCard title="System Impact">
                        <p className="font-semibold text-green-400 text-xs">{result.systemImpact}</p>
                    </ResultCard>
                 </div>
            )}
        </div>
    );
};