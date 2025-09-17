import React from 'react';
import { Mission } from '../types';

interface FinalReportProps {
    mission: Mission;
}

export const FinalReport: React.FC<FinalReportProps> = ({ mission }) => {
    const completedTasks = mission.taskGraph.filter(task => task.status === 'completed').length;
    const totalTasks = mission.taskGraph.length;

    return (
        <div className="animate-fade-in-up bg-gray-800/50 border border-indigo-500/20 rounded-lg p-6 backdrop-blur-sm shadow-lg shadow-indigo-900/20">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-indigo-300">Mission Final Report</h2>
                <p className="mt-2 text-lg text-indigo-200/80 max-w-3xl mx-auto">
                    Objective: {mission.objective}
                </p>
                <p className={`mt-2 text-lg font-bold ${mission.status === 'completed' ? 'text-green-400' : 'text-rose-400'}`}>
                    Status: {mission.status.toUpperCase()}
                </p>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-indigo-300 border-b-2 border-indigo-500/30 pb-2 mb-4">Summary</h3>
                <p className="text-indigo-100">The mission concluded with {completedTasks} out of {totalTasks} tactical steps successfully executed.</p>
                {/* A more detailed summary could be generated here */}
            </div>
        </div>
    );
};
