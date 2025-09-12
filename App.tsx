import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MissionInput } from './components/MissionInput';
import { Dashboard } from './components/Dashboard';
import { FinalReport } from './components/FinalReport';
import { Mission, OrchestrationLogEntry } from './types';
import { startMission, updateMissionStatus } from './services/geminiService';
import { ViewToggle, View } from './components/ViewToggle';
import { AgentExplorer } from './components/AgentExplorer';
import { SystemIntegrityView } from './components/SystemIntegrityView';
import { KnowledgeCore } from './components/KnowledgeCore';
import { StrategicRoadmap } from './components/StrategicRoadmap';
import { OrchestratorChat } from './components/OrchestratorChat';
import { QaeInterface } from './components/QaeInterface';
import { MissionArchive } from './components/MissionArchive';

const App: React.FC = () => {
  const [mission, setMission] = useState<Mission | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<View>('Mission Control');
  const [log, setLog] = useState<OrchestrationLogEntry[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (mission && mission.status === 'ongoing') {
      interval = setInterval(async () => {
        try {
          const { updatedMission, newLogEntry } = await updateMissionStatus(mission);
          setMission(updatedMission);
          if (newLogEntry) {
            setLog(prevLog => [...prevLog, newLogEntry]);
          }
        } catch (err) {
          console.error("Failed to update mission status:", err);
          setError('Connection to Nexus AI lost. Please check console.');
        }
      }, 7000); // Poll for updates every 7 seconds
    }
    return () => clearInterval(interval);
  }, [mission]);

  const handleStartMission = async (missionText: string) => {
    setIsLoading(true);
    setError(null);
    setMission(null);
    setLog([]);
    try {
      const newMission = await startMission(missionText);
      setMission(newMission);
      setActiveView('Mission Control');
    } catch (err) {
      console.error("Failed to start mission:", err);
      setError("Mission initialization failed. The AI core might be offline. Check the console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (activeView === 'System Integrity') {
      return <SystemIntegrityView />;
    }
    if (activeView === 'Knowledge Core') {
      return <KnowledgeCore />;
    }
    if (activeView === 'Strategic Roadmap') {
        return <StrategicRoadmap />;
    }
    if (activeView === 'Orchestrator') {
        return <OrchestratorChat log={log} />;
    }
    if (activeView === 'QAE Interface') {
        return <QaeInterface />;
    }
    if (activeView === 'Archives') {
        return <MissionArchive />;
    }
    if (activeView === 'Agent Explorer') {
        return <AgentExplorer agents={mission?.agents || []} />;
    }
    // Default to Mission Control
    if (mission) {
      if (mission.status === 'completed' || mission.status === 'failed') {
        return <FinalReport mission={mission} />;
      }
      return <Dashboard mission={mission} />;
    }
    return <MissionInput onSubmit={handleStartMission} isLoading={isLoading} />;
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen font-sans bg-grid-indigo-500/10">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <ViewToggle activeView={activeView} onViewChange={setActiveView} />

        {error && (
          <div className="my-4 p-4 bg-rose-800/50 border border-rose-500/50 text-rose-200 rounded-lg text-center">
            <p className="font-bold">System Alert</p>
            <p>{error}</p>
          </div>
        )}
        
        {renderContent()}
      </main>
      <footer className="text-center p-4 text-xs text-gray-500">
        <p>QAI Nexus Control v2.5. Status: NOMINAL</p>
      </footer>
    </div>
  );
};

export default App;
