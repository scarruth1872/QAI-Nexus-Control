
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MissionInput } from './components/MissionInput';
import { Dashboard } from './components/Dashboard';
import { ViewToggle } from './components/ViewToggle';
import { AgentExplorer } from './components/AgentExplorer';
import { OrchestratorChat } from './components/OrchestratorChat';
import { SystemIntegrityView } from './components/SystemIntegrityView';
import { KnowledgeCore } from './components/KnowledgeCore';
import { StrategicRoadmap } from './components/StrategicRoadmap';
import { Mission, View, TacticalStep, Agent } from './types';
import { initiateMission } from './services/geminiService';
import { FinalReport } from './components/FinalReport';

const App: React.FC = () => {
    const [mission, setMission] = useState<Mission | null>(null);
    const [view, setView] = useState<View>('mission');
    const [isLoading, setIsLoading] = useState(false);

    // This effect will simulate the mission progress
    useEffect(() => {
        if (mission?.status === 'in_progress') {
            const interval = setInterval(() => {
                setMission(prevMission => {
                    if (!prevMission) return null;

                    const newGraph = [...prevMission.taskGraph];
                    const pendingStepIndex = newGraph.findIndex(step => step.status === 'pending');

                    if (pendingStepIndex !== -1) {
                        // Move a pending task to in_progress
                        const inProgressIndex = newGraph.findIndex(step => step.status === 'in_progress');
                        if (inProgressIndex === -1) { // Only one task in progress at a time
                             newGraph[pendingStepIndex] = { ...newGraph[pendingStepIndex], status: 'in_progress' };
                        }
                    } else {
                        // Move an in_progress task to completed
                        const inProgressIndex = newGraph.findIndex(step => step.status === 'in_progress');
                        if (inProgressIndex !== -1) {
                            newGraph[inProgressIndex] = { 
                                ...newGraph[inProgressIndex], 
                                status: 'completed',
                                result: JSON.stringify({
                                    data_points: Math.floor(Math.random() * 1000),
                                    confidence: Math.random().toFixed(2),
                                })
                            };
                        } else {
                            // All tasks are done, mission complete
                            clearInterval(interval);
                            return { 
                                ...prevMission, 
                                status: 'completed',
                                finalReport: `Mission Objective: ${prevMission.objective}\n\n**Execution Summary:**\nAll tactical phases were executed successfully. The multi-agent system demonstrated high efficiency and adaptability. The primary objective was achieved with a 98.7% confidence rating.\n\n**Key Findings:**\nThe collaborative approach between the Scientific Discovery and Planetary Exploration agents yielded novel insights into atmospheric composition, exceeding initial projections by 15%.\n\n**Conclusion:**\nThe mission is a resounding success, validating the new task-graph based allocation system.`
                            };
                        }
                    }
                    return { ...prevMission, taskGraph: newGraph };
                });
            }, 2000); // Update every 2 seconds

            return () => clearInterval(interval);
        }
    }, [mission?.status]);


    const handleMissionSubmit = async (missionText: string) => {
        setIsLoading(true);
        try {
            const missionPlan = await initiateMission(missionText);
            
            // Flatten the tactical plan steps into a single task graph for easier state management
            const taskGraph = missionPlan.tacticalPlans?.flatMap(plan => plan.steps.map(step => ({...step, status: 'pending'} as TacticalStep))) ?? [];
            
            const fullMission: Mission = {
                objective: missionPlan.objective || missionText,
                agents: missionPlan.agents as Agent[] || [],
                tacticalPlans: missionPlan.tacticalPlans || [],
                taskGraph: taskGraph,
                status: 'in_progress',
            };
            setMission(fullMission);
            setView('mission');
        } catch (error) {
            console.error("Failed to initiate mission:", error);
            // You could set an error state here to show the user
        } finally {
            setIsLoading(false);
        }
    };

    const renderView = () => {
        switch (view) {
            case 'mission':
                if (!mission) {
                    return <MissionInput onSubmit={handleMissionSubmit} isLoading={isLoading} />;
                }
                if (mission.status === 'completed' || mission.status === 'failed') {
                    return <FinalReport mission={mission} />;
                }
                return <Dashboard mission={mission} />;
            case 'explorer':
                return <AgentExplorer />;
            case 'orchestrator':
                return <OrchestratorChat />;
            case 'system':
                return <SystemIntegrityView />;
            case 'knowledge':
                return <KnowledgeCore />;
            case 'roadmap':
                return <StrategicRoadmap />;
            default:
                if (!mission) {
                    return <MissionInput onSubmit={handleMissionSubmit} isLoading={isLoading} />;
                }
                return <Dashboard mission={mission} />;
        }
    };

    return (
        <div className="bg-gray-900 text-gray-200 min-h-screen font-sans">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
            <div className="relative isolate min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow container mx-auto px-4 py-8">
                     <ViewToggle 
                        currentView={view} 
                        onViewChange={setView}
                        isMissionActive={!!mission}
                    />
                    {renderView()}
                </main>
                <footer className="text-center py-4 text-xs text-gray-500">
                    QAI Nexus Control Interface v2.7.1
                </footer>
            </div>
        </div>
    );
};

export default App;
