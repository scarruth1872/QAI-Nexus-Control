
import React, { useState } from 'react';
import { Mission, StrategicAdvice } from '../types';
import { AgentCard } from './AgentCard';
import { TacticalPhase } from './TacticalPhase';
import { StrategicAdvisoryModal } from './StrategicAdvisoryModal';
import { LightbulbIcon } from './Icons';
import { getStrategicAdvice } from '../services/geminiService';

export const Dashboard: React.FC<{ mission: Mission }> = ({ mission }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAdvisoryLoading, setIsAdvisoryLoading] = useState(false);
    const [advice, setAdvice] = useState<StrategicAdvice | null>(null);


    const handleAdvisorySubmit = async (query: string) => {
        setIsAdvisoryLoading(true);
        setAdvice(null);
        try {
            const result = await getStrategicAdvice(query);
            setAdvice(result);
        } catch (error) {
            console.error("Failed to get strategic advice:", error);
            // Here you could set an error state to show in the modal
        } finally {
            setIsAdvisoryLoading(false);
        }
    };

    const openModal = () => {
        setAdvice(null);
        setIsModalOpen(true);
    };


    return (
        <div className="animate-fade-in-up">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-indigo-300">Mission Dashboard</h2>
                <p className="mt-2 text-lg text-indigo-200/80 max-w-3xl mx-auto">
                    Objective: {mission.objective}
                </p>
            </div>

            <div className="flex justify-center mb-8">
                <button
                    onClick={openModal}
                    className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-500/50 hover:bg-indigo-500/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all duration-300"
                >
                    <LightbulbIcon className="w-5 h-5 mr-2" />
                    Consult Strategic Advisory
                </button>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Agent Status */}
                <div className="lg:col-span-1 space-y-4">
                     <h3 className="text-xl font-semibold text-indigo-300 border-b-2 border-indigo-500/30 pb-2">Active Agents</h3>
                    {mission.agents.map(agent => (
                        <AgentCard key={agent.id} agent={agent} />
                    ))}
                </div>

                {/* Tactical Plan */}
                <div className="lg:col-span-2 space-y-6">
                     <h3 className="text-xl font-semibold text-indigo-300 border-b-2 border-indigo-500/30 pb-2">Tactical Execution</h3>
                    {mission.tacticalPlans.map((plan, index) => {
                        // We need to pass the updated steps from the flat taskGraph
                        const phaseSteps = mission.taskGraph.filter(task => {
                             const planStep = plan.steps.find(s => s.description === task.description && s.agent === task.agent);
                             return !!planStep;
                        });
                        const updatedPlan = { ...plan, steps: phaseSteps };
                        return <TacticalPhase key={index} phase={updatedPlan} />
                    })}
                </div>
            </div>
             <StrategicAdvisoryModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAdvisorySubmit}
                isLoading={isAdvisoryLoading}
                advice={advice}
            />
        </div>
    );
};