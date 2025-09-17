
import React from 'react';
import { Mission, AgentType } from '../types';
import { ScienceIcon, SocietyIcon, PlanetIcon, CheckCircleIcon, AlertIcon } from './Icons';

const agentIcons = {
  [AgentType.SCIENTIFIC_DISCOVERY]: ScienceIcon,
  [AgentType.SOCIETAL_MODELING]: SocietyIcon,
  [AgentType.PLANETARY_EXPLORATION]: PlanetIcon,
};

export const FinalReport: React.FC<{ mission: Mission }> = ({ mission }) => {
  const completedTasks = mission.taskGraph.filter(t => t.status === 'completed').length;
  const failedTasks = mission.taskGraph.filter(t => t.status === 'failed').length;
  const totalTasks = mission.taskGraph.length;
  const successRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const isSuccess = mission.status === 'completed';

  return (
    <div className="animate-fade-in-up bg-gray-800/50 border border-indigo-500/20 rounded-lg p-6 backdrop-blur-sm shadow-lg shadow-indigo-900/20">
      <div className="text-center mb-6 border-b border-indigo-500/20 pb-4">
        <h2 className="text-3xl font-bold text-indigo-300">Mission Final Report</h2>
        <p className="mt-2 text-lg text-indigo-200/80">Objective: {mission.objective}</p>
      </div>

      <div className={`flex items-center justify-center p-4 rounded-lg mb-6 ${isSuccess ? 'bg-green-500/10 text-green-300' : 'bg-rose-500/10 text-rose-300'}`}>
        {isSuccess ? <CheckCircleIcon className="w-8 h-8 mr-4" /> : <AlertIcon className="w-8 h-8 mr-4" />}
        <span className="text-2xl font-bold">Mission Status: {isSuccess ? 'Success' : 'Failed'}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
        <div className="bg-black/20 p-4 rounded-md">
            <div className="text-xs font-semibold uppercase text-indigo-300">Total Tasks</div>
            <div className="text-3xl font-mono font-bold text-white">{totalTasks}</div>
        </div>
        <div className="bg-black/20 p-4 rounded-md">
            <div className="text-xs font-semibold uppercase text-indigo-300">Success Rate</div>
            <div className="text-3xl font-mono font-bold text-green-400">{successRate.toFixed(1)}%</div>
        </div>
        <div className="bg-black/20 p-4 rounded-md">
            <div className="text-xs font-semibold uppercase text-indigo-300">Failed Tasks</div>
            <div className="text-3xl font-mono font-bold text-rose-400">{failedTasks}</div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-indigo-300 mb-4">Agent Performance Summary</h3>
        <div className="space-y-4">
            {mission.agents.map(agent => {
                const AgentIcon = agentIcons[agent.type];
                const agentTasks = mission.taskGraph.filter(t => t.agent === agent.type);
                const agentCompleted = agentTasks.filter(t => t.status === 'completed').length;
                return (
                    <div key={agent.id} className="flex items-center bg-gray-900/50 p-3 rounded-lg">
                        <AgentIcon className="w-8 h-8 text-indigo-400 mr-4" />
                        <div className="flex-1">
                            <h4 className="font-semibold text-white">{agent.type}</h4>
                            <p className="text-xs text-gray-400">Tasks Completed: {agentCompleted} / {agentTasks.length}</p>
                        </div>
                        <div className="text-right">
                             <p className="text-xs text-gray-400">Final Confidence</p>
                             <p className="font-bold text-lg text-cyan-300">{agent.confidence.toFixed(1)}%</p>
                        </div>
                    </div>
                );
            })}
        </div>
      </div>
    </div>
  );
};
