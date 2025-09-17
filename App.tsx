
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MissionInput } from './components/MissionInput';
import { Dashboard } from './components/Dashboard';
import { FinalReport } from './components/FinalReport';
import { View, ViewToggle } from './components/ViewToggle';
import { AgentExplorer } from './components/AgentExplorer';
import { SystemStatusDashboard } from './components/SystemStatusDashboard';
import { SystemOptimization } from './components/SystemOptimization';
import { Mission, MissionStatus, SystemStatus, TaskStatus, OrchestrationLogEntry } from './types';
import { generateMissionPlan } from './services/geminiService';
import { SystemIntegrityView } from './components/SystemIntegrityView';
import { StrategicRoadmap } from './components/StrategicRoadmap';
import { KnowledgeCore } from './components/KnowledgeCore';
import { OrchestratorChat } from './components/OrchestratorChat';
import { MissionArchive } from './components/MissionArchive';
import { QaeInterface } from './components/QaeInterface';
import { UnifiedFieldAssessment } from './components/UnifiedFieldAssessment';


const App: React.FC = () => {
  const [mission, setMission] = useState<Mission | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentView, setCurrentView] = useState<View>('Mission Control');
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    coherence: 98.5,
    cognitiveLoad: 22.3,
    mode: 'STANDBY',
    internalMonologue: 'System nominal. Awaiting directives.',
    alignmentStatus: {
      isAligned: true,
      warning: null,
    },
  });
   const [orchestrationLog, setOrchestrationLog] = useState<OrchestrationLogEntry[]>([]);
   const [isSkfActive, setIsSkfActive] = useState(false);


  const addLog = (entry: Omit<OrchestrationLogEntry, 'timestamp'>) => {
    setOrchestrationLog(prev => [...prev, { ...entry, timestamp: Date.now() }]);
  };

  const handleMissionSubmit = async (missionText: string) => {
    setIsLoading(true);
    setMission(null);
    setCurrentView('Mission Control');
    setOrchestrationLog([]);
    addLog({ type: 'System', decision: `Initializing new mission objective: ${missionText}` });
    try {
      const newMission = await generateMissionPlan(missionText);
      setMission(newMission);
      setSystemStatus(prev => ({ ...prev, mode: 'ACTIVE' }));
      addLog({ type: 'System', decision: 'Mission plan generated. Deploying agents.' });
    } catch (error) {
      console.error("Failed to generate mission plan:", error);
      // You might want to set an error state here to show in the UI
      addLog({ type: 'Error', decision: 'Failed to generate mission plan.' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (mission && mission.status === 'ongoing') {
      const taskInterval = setInterval(() => {
        setMission(prevMission => {
          if (!prevMission || prevMission.status !== 'ongoing') {
            clearInterval(taskInterval);
            return prevMission;
          }

          const newMission = { ...prevMission, taskGraph: [...prevMission.taskGraph.map(t => ({...t}))], agents: [...prevMission.agents.map(a => ({...a}))] };
          
          let nextTask = newMission.taskGraph.find(t => t.status === 'pending');
          let currentTask = newMission.taskGraph.find(t => t.status === 'in_progress');

          if(currentTask){
             // Complete current task
             const taskIndex = newMission.taskGraph.findIndex(t => t.id === currentTask!.id);
             const isSuccess = Math.random() > 0.1; // 10% chance of failure
             newMission.taskGraph[taskIndex].status = isSuccess ? 'completed' : 'failed';
             newMission.taskGraph[taskIndex].result = isSuccess ? JSON.stringify({ data: "Sample output data", confidence: 0.95 }) : "Critical error during execution.";
             
             // Update agent confidence
             const agentIndex = newMission.agents.findIndex(a => a.type === currentTask!.agent);
             if (agentIndex !== -1) {
                const confidenceChange = isSuccess ? Math.random() * 2 : -Math.random() * 5;
                newMission.agents[agentIndex].confidence = Math.max(0, Math.min(100, newMission.agents[agentIndex].confidence + confidenceChange));
             }
            addLog({ type: 'Classical', decision: `Task ${currentTask.id} ${isSuccess ? 'completed' : 'failed'} by ${currentTask.agent}.` });

          } else if (nextTask) {
            // Start next task
            const taskIndex = newMission.taskGraph.findIndex(t => t.id === nextTask!.id);
            newMission.taskGraph[taskIndex].status = 'in_progress';
            addLog({ type: 'Classical', decision: `Assigning task ${nextTask.id} to ${nextTask.agent}.` });
          } else {
             // All tasks are done
             const failedTasks = newMission.taskGraph.filter(t => t.status === 'failed').length;
             newMission.status = failedTasks > newMission.taskGraph.length / 3 ? 'failed' : 'completed';
             setSystemStatus(prev => ({...prev, mode: 'STANDBY'}));
             addLog({ type: 'System', decision: `Mission ${newMission.id} has concluded with status: ${newMission.status}.` });
             clearInterval(taskInterval);
          }
          
          return newMission;
        });

         // Update system status periodically
        setSystemStatus(prev => ({
            ...prev,
            coherence: Math.max(80, Math.min(99, prev.coherence + (Math.random() - 0.5) * 2)),
            cognitiveLoad: Math.max(10, Math.min(90, prev.cognitiveLoad + (Math.random() - 0.5) * 5)),
            internalMonologue: `Executing task... confidence levels fluctuating... monitoring agent performance.`
        }));

      }, 3000);

      return () => clearInterval(taskInterval);
    }
  }, [mission]);

  const renderView = () => {
    switch(currentView) {
      case 'Mission Control':
        if (!mission) {
            return <MissionInput onSubmit={handleMissionSubmit} isLoading={isLoading} />;
        }
        if (mission.status === 'ongoing') {
            return <Dashboard mission={mission} />;
        }
        return <FinalReport mission={mission} />;

      case 'Agent Explorer':
          return <AgentExplorer agents={mission?.agents ?? []} />;
      
      case 'System Integrity':
          return <SystemIntegrityView systemStatus={systemStatus} />;

      case 'Strategic Roadmap':
          return <StrategicRoadmap onSkfUpgrade={() => setIsSkfActive(true)} />;

      case 'Knowledge Core':
          return <KnowledgeCore isSkfActive={isSkfActive} />;

      case 'Orchestrator C2':
          return <OrchestratorChat log={orchestrationLog} />;
      
      case 'Anomaly Detection':
          return <QaeInterface />;

      case 'Mission Archives':
          return <MissionArchive />;

      case 'Unified Field':
          return <UnifiedFieldAssessment />;
          
      default:
        return (
          <div className="text-center py-16 bg-gray-800/30 rounded-lg border border-indigo-500/20">
            <p className="text-indigo-300">{currentView} view not implemented yet.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans bg-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/80 to-indigo-900/20 z-0"></div>
      <div className="relative z-10">
        <Header />
        <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-8">
                {systemStatus.mode === 'ACTIVE' && mission && <SystemStatusDashboard status={systemStatus} />}
                {mission && <SystemOptimization mission={mission}/>}
                <div className="mt-8">
                  <ViewToggle currentView={currentView} setView={setCurrentView} />
                </div>
                <div className="mt-8">
                  {renderView()}
                </div>
            </div>
        </main>
      </div>
    </div>
  );
};

export default App;
