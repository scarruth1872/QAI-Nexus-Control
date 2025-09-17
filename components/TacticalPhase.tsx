
import React from 'react';
import { TacticalPlan, TacticalStep, AgentType } from '../types';
import { ScienceIcon, SocietyIcon, PlanetIcon } from './Icons';
import { Spinner } from './Spinner';
import { StructuredResultDisplay } from './StructuredResultDisplay';

const agentIcons: { [key in AgentType]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  [AgentType.SCIENTIFIC_DISCOVERY]: ScienceIcon,
  [AgentType.SOCIETAL_MODELING]: SocietyIcon,
  [AgentType.PLANETARY_EXPLORATION]: PlanetIcon,
};

const statusColors = {
    pending: 'border-gray-600 text-gray-400',
    in_progress: 'border-indigo-500 text-indigo-300 animate-pulse',
    completed: 'border-green-500 text-green-300',
    failed: 'border-rose-500 text-rose-300',
};

const Step: React.FC<{ step: TacticalStep }> = ({ step }) => {
    const AgentIcon = agentIcons[step.agent];
    return (
        <li className={`p-3 rounded-md border-l-4 ${statusColors[step.status]} bg-black/20`}>
            <div className="flex items-start justify-between">
                <div>
                    <div className="flex items-center text-xs mb-1">
                        {AgentIcon && <AgentIcon className="w-4 h-4 mr-2 flex-shrink-0" />}
                        <span className="font-semibold">{step.agent}</span>
                    </div>
                    <p className="text-sm text-gray-200">{step.description}</p>
                </div>
                {step.status === 'in_progress' && <Spinner className="w-5 h-5 ml-4" />}
            </div>
            {step.status === 'completed' && step.result && (
                <div className="mt-2 pl-6">
                    <h5 className="text-xs font-semibold text-indigo-300 mb-1">Result:</h5>
                    <StructuredResultDisplay result={step.result} />
                </div>
            )}
             {step.status === 'failed' && step.result && (
                <div className="mt-2 pl-6">
                    <h5 className="text-xs font-semibold text-rose-400 mb-1">Failure Details:</h5>
                    <div className="text-xs font-mono p-2 bg-rose-500/10 rounded-md text-rose-300">
                        {step.result}
                    </div>
                </div>
            )}
        </li>
    )
}

export const TacticalPhase: React.FC<{ phase: TacticalPlan }> = ({ phase }) => {
    return (
        <div className="bg-gray-800/30 border border-indigo-500/20 rounded-lg p-4 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-indigo-300 mb-4">{phase.phase}</h3>
            <ul className="space-y-3">
                {phase.steps.map(step => <Step key={step.id} step={step} />)}
            </ul>
        </div>
    );
};