
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MissionInput } from './components/MissionInput';
import { Dashboard } from './components/Dashboard';
import { ViewToggle } from './components/ViewToggle';
import { AgentExplorer } from './components/AgentExplorer';
import { OrchestratorChat } from './components/OrchestratorChat';
import { KnowledgeCore } from './components/KnowledgeCore';
import { SystemIntegrityView } from './components/SystemIntegrityView';
import { FinalReport } from './components/FinalReport';
import { generateMissionPlan, executeTacticalStep, generateFinalReport } from './services/geminiService';
import { Mission, View, AgentType, ProbeType, TacticalStep, Agent } from './types';

const App: React.FC = () => {
  const [mission, setMission] = useState<Mission | null>(null);
  const [view, setView] = useState<View>('mission');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleMissionSubmit = async (missionText: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const plans = await generateMissionPlan(missionText);
      const allSteps: TacticalStep[] = plans.flatMap((plan, planIndex) => 
          plan.steps.map((step, stepIndex) => ({
              ...step,
              id: planIndex * 100 + stepIndex,
              status: 'pending',
          }))
      );
      
      const uniqueAgentTypes = [...new Set(allSteps.map(step => step.agent))];
      const agents: Agent[] = uniqueAgentTypes.map((type, index) => ({
          id: `agent-${index}`,
          type: type,
          status: 'idle',
          confidence: 100,
      }));

      setMission({
        objective: missionText,
        tacticalPlans: plans,
        taskGraph: allSteps,
        agents: agents,
        status: 'executing',
      });
      setView('mission');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to generate mission plan.');
      setMission(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Mission execution logic
  useEffect(() => {
    if (mission?.status !== 'executing') return;

    const executeNextStep = async () => {
      const pendingStep = mission.taskGraph.find(step => step.status === 'pending');
      
      if (!pendingStep) {
        // All steps are done
        const outcomes = mission.taskGraph
          .filter(s => s.status === 'completed')
          .map(s => `${s.description}: ${s.result}`)
          .join('\n');
        
        const report = await generateFinalReport(mission.objective, outcomes);
        setMission(prev => prev ? ({ ...prev, status: 'completed' as const, finalReport: report }) : null);
        return;
      }
      
      // Set step to in_progress
      setMission(prev => {
        if (!prev) return null;
        const newGraph = prev.taskGraph.map(step => 
          // FIX: Added `as const` to ensure the status type is a literal, not a string.
          step.id === pendingStep.id ? { ...step, status: 'in_progress' as const } : step
        );
        return { ...prev, taskGraph: newGraph };
      });
      
      try {
        const result = await executeTacticalStep(pendingStep.description, pendingStep.agent);
        setMission(prev => {
          if (!prev) return null;
          const newGraph = prev.taskGraph.map(step => 
            // FIX: Added `as const` to ensure the status type is a literal, not a string.
            step.id === pendingStep.id ? { ...step, status: 'completed' as const, result } : step
          );
          return { ...prev, taskGraph: newGraph };
        });
      } catch (e) {
        console.error(`Failed to execute step ${pendingStep.id}:`, e);
        setMission(prev => {
          if (!prev) return null;
          const newGraph = prev.taskGraph.map(step => 
            // FIX: Added `as const` to ensure the status type is a literal, not a string.
            step.id === pendingStep.id ? { ...step, status: 'failed' as const, result: e instanceof Error ? e.message : 'Unknown error' } : step
          );
          return { ...prev, taskGraph: newGraph };
        });
        // For simplicity, we fail the whole mission on one step failure
        setMission(prev => prev ? ({ ...prev, status: 'failed' as const }) : null);
      }
    };

    const timeoutId = setTimeout(executeNextStep, 1500); // Delay between steps
    return () => clearTimeout(timeoutId);

  }, [mission]);

  const handleProbe = (agentType: AgentType, probeType: ProbeType) => {
    console.log(`Probing ${agentType} with ${probeType}`);
    // The actual API call is handled within AgentPanel for this UI
  };

  const renderView = () => {
    if (mission?.status === 'completed' || mission?.status === 'failed') {
      return <FinalReport mission={mission} />;
    }
    
    switch (view) {
      case 'mission':
        return mission ? <Dashboard mission={mission} /> : <MissionInput onSubmit={handleMissionSubmit} isLoading={isLoading} />;
      case 'explorer':
        return <AgentExplorer onProbe={handleProbe} />;
      case 'orchestrator':
          return <OrchestratorChat />;
      case 'system':
          return <SystemIntegrityView mission={mission}/>;
      case 'knowledge':
          return <KnowledgeCore />;
      default:
        return <MissionInput onSubmit={handleMissionSubmit} isLoading={isLoading} />;
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen font-sans">
      <div 
        className="absolute inset-0 bg-grid-indigo-500/10 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
        style={{ backgroundSize: '40px 40px' }}
      ></div>
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 py-8">
          {error && (
            <div className="max-w-3xl mx-auto bg-rose-500/20 border border-rose-500 text-rose-200 p-4 rounded-lg mb-8">
              <h3 className="font-bold">Error</h3>
              <p>{error}</p>
            </div>
          )}
          <ViewToggle 
            currentView={view} 
            onViewChange={setView}
            isMissionActive={!!mission && (mission.status === 'executing' || mission.status === 'planning')}
          />
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
