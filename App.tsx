import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MissionInput } from './components/MissionInput';
import { Dashboard } from './components/Dashboard';
import { ViewToggle, View } from './components/ViewToggle';
import { AgentExplorer } from './components/AgentExplorer';
import { SystemStatusDashboard } from './components/SystemStatusDashboard';
import { SystemOptimization } from './components/SystemOptimization';
import { SystemIntegrityView } from './components/SystemIntegrityView';
import { KnowledgeCore } from './components/KnowledgeCore';
import { StrategicRoadmap } from './components/StrategicRoadmap';
import { OrchestratorChat } from './components/OrchestratorChat';
import { MissionArchive } from './components/MissionArchive';
import { QaeInterface } from './components/QaeInterface';
import { UnifiedFieldAssessment } from './components/UnifiedFieldAssessment';
import { FinalReport } from './components/FinalReport';
import { generateMissionPlan } from './services/geminiService';
import { 
    Mission, 
    SystemStatus, 
    TaskStatus,
    AgentStatus,
    OrchestrationLogEntry,
    LogEntryType,
} from './types';

const App: React.FC = () => {
    const [mission, setMission] = useState<Mission | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentView, setCurrentView] = useState<View>('Mission Control');
    const [systemStatus, setSystemStatus] = useState<SystemStatus>({
        coherence: 100,
        cognitiveLoad: 0,
        mode: 'Supervised',
        internalMonologue: 'System standby. Awaiting mission parameters.',
        alignmentStatus: { isAligned: true, warning: null },
    });
    const [log, setLog] = useState<OrchestrationLogEntry[]>([]);
    
    const [isSkfActive, setIsSkfActive] = useState(false);


    const addLogEntry = (type: LogEntryType, decision: string) => {
        setLog(prevLog => [...prevLog, { timestamp: Date.now(), type, decision }]);
    };
    
    useEffect(() => {
        if (!mission || mission.status !== 'active') return;

        const interval = setInterval(() => {
            setMission(prevMission => {
                if (!prevMission) return null;

                const newSystemStatus: Partial<SystemStatus> = {};
                let updated = false;

                const nextPendingTaskIndex = prevMission.taskGraph.findIndex(t => t.status === 'pending');
                
                if (nextPendingTaskIndex === -1) {
                    const allCompleted = prevMission.taskGraph.every(t => t.status === 'completed');
                     if (allCompleted || prevMission.taskGraph.every(t => t.status === 'completed' || t.status === 'failed')) {
                        clearInterval(interval);
                        return { ...prevMission, status: allCompleted ? 'completed' : 'failed' };
                    }
                }

                const currentInProgressCount = prevMission.taskGraph.filter(t => t.status === 'in_progress').length;
                let taskToStart = -1;
                if (currentInProgressCount < 2 && nextPendingTaskIndex !== -1) {
                    taskToStart = nextPendingTaskIndex;
                }
                
                let newAgents = [...prevMission.agents];

                const newTasks = [...prevMission.taskGraph].map((task, index) => {
                    // Start a new task?
                    if (index === taskToStart) {
                        updated = true;
                        addLogEntry('Classical', `Initiating task: "${task.description}" for ${task.agent}.`);
                        newSystemStatus.internalMonologue = `Executing tactical step: ${task.description}`;
                        
                        const agentIndex = newAgents.findIndex(a => a.type === task.agent);
                        if (agentIndex !== -1) {
                            newAgents = newAgents.map((a, i) => i === agentIndex ? { ...a, status: 'active' as AgentStatus } : a);
                        }

                        return { ...task, status: 'in_progress' as TaskStatus };
                    }
                    
                    // Complete an in-progress task?
                    if (task.status === 'in_progress' && Math.random() > 0.6) {
                        updated = true;
                        const isSuccess = Math.random() > 0.1; // 90% success rate
                        
                        addLogEntry(isSuccess ? 'Quantum' : 'Error', `Task "${task.description}" concluded. Status: ${isSuccess ? 'SUCCESS' : 'FAILURE'}.`);
                         
                        const agentIndex = newAgents.findIndex(a => a.type === task.agent);
                        if (agentIndex !== -1) {
                            newAgents = newAgents.map((a, i) => i === agentIndex ? { ...a, status: 'idle' as AgentStatus } : a);
                        }

                        return {
                            ...task,
                            status: isSuccess ? 'completed' as TaskStatus : 'failed' as TaskStatus,
                            result: isSuccess ? `{"output": "Data processed successfully", "confidence": ${Math.random().toFixed(2)}}` : 'Computational error: Decoherence cascade detected.',
                        };
                    }

                    return task;
                });

                if (updated) {
                    const newCognitiveLoad = (newTasks.filter(t => t.status === 'in_progress').length / newTasks.length) * 100 + Math.random() * 10;
                    setSystemStatus(prev => ({
                        ...prev,
                        cognitiveLoad: Math.min(100, newCognitiveLoad),
                        coherence: Math.max(0, prev.coherence - Math.random() * 0.5),
                        ...newSystemStatus
                    }));
                    return { ...prevMission, taskGraph: newTasks, agents: newAgents };
                }

                return prevMission;
            });
        }, 3000);

        return () => clearInterval(interval);

    }, [mission?.status]);


    const handleMissionSubmit = async (missionText: string) => {
        setIsLoading(true);
        setMission(null);
        setLog([]);
        addLogEntry('System', 'Mission parameters received. Initiating planning phase.');
        
        try {
            const missionPlan = await generateMissionPlan(missionText);
            setMission(missionPlan);
            addLogEntry('System', 'Mission plan generated. Deploying agents.');
            setSystemStatus({
                coherence: 99.8,
                cognitiveLoad: 5,
                mode: 'Autonomous',
                internalMonologue: `Mission objective locked: ${missionText}`,
                alignmentStatus: { isAligned: true, warning: null },
            });
        } catch (error) {
            console.error("Failed to generate mission plan:", error);
            setSystemStatus(prev => ({ ...prev, internalMonologue: 'Error: Mission planning failed.', alignmentStatus: {isAligned: false, warning: 'Planning module failure.'} }));
        } finally {
            setIsLoading(false);
        }
    };

    const renderView = () => {
        switch (currentView) {
            case 'Mission Control':
                return mission ? (
                    <div className="space-y-8">
                        <SystemStatusDashboard status={systemStatus} />
                        <Dashboard mission={mission} />
                        <SystemOptimization mission={mission} />
                    </div>
                ) : <MissionInput onSubmit={handleMissionSubmit} isLoading={isLoading} />;
            case 'Agent Explorer':
                return <AgentExplorer agents={mission?.agents || []} />;
            case 'System Integrity':
                return <SystemIntegrityView systemStatus={systemStatus} />;
            case 'Knowledge Core':
                return <KnowledgeCore isSkfActive={isSkfActive} />;
            case 'Strategic Roadmap':
                return <StrategicRoadmap onSkfUpgrade={() => setIsSkfActive(true)} />;
            case 'Orchestrator C2':
                return <OrchestratorChat log={log} />;
            case 'Anomaly Detection':
                return <QaeInterface />;
            case 'Mission Archives':
                return <MissionArchive />;
            case 'Unified Field':
                return <UnifiedFieldAssessment />;
            default:
                return <MissionInput onSubmit={handleMissionSubmit} isLoading={isLoading} />;
        }
    };

    return (
        <div className="bg-gray-900 text-gray-200 min-h-screen font-sans">
            <div className="bg-gradient-to-b from-gray-900 via-gray-900/90 to-transparent">
                <Header />
            </div>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                 <div className="mb-8">
                    <ViewToggle currentView={currentView} setView={setCurrentView} />
                </div>
                {mission?.status === 'completed' || mission?.status === 'failed' ? (
                     <FinalReport mission={mission} />
                ) : (
                    renderView()
                )}
            </main>
        </div>
    );
};

export default App;
