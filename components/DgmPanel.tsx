
import React from 'react';
import { RecursionIcon } from './Icons';

export const DgmPanel: React.FC = () => {
    return (
        <div className="animate-fade-in-up bg-gray-800/50 border border-indigo-500/20 rounded-lg p-6 backdrop-blur-sm shadow-lg shadow-indigo-900/20">
            <div className="text-center">
                <RecursionIcon className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-indigo-300">Dynamic Goal Management (DGM)</h3>
                <p className="mt-2 text-indigo-200/80 max-w-xl mx-auto text-sm">
                    This module allows for real-time modification of mission objectives and agent priorities.
                </p>
                 <div className="mt-6 text-sm text-gray-500">
                    Module offline. Awaiting integration with main orchestrator.
                </div>
            </div>
        </div>
    );
};
