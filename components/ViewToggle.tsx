import React from 'react';

export type View = 
    | 'Mission Control' 
    | 'Agent Explorer' 
    | 'System Integrity' 
    | 'Knowledge Core' 
    | 'Strategic Roadmap'
    | 'Orchestrator C2'
    | 'Anomaly Detection'
    | 'Mission Archives'
    | 'Unified Field';

const views: View[] = [
    'Mission Control', 
    'Agent Explorer', 
    'System Integrity',
    'Knowledge Core',
    'Strategic Roadmap',
    'Orchestrator C2',
    'Anomaly Detection',
    'Mission Archives',
    'Unified Field'
];

interface ViewToggleProps {
  currentView: View;
  setView: (view: View) => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ currentView, setView }) => {
  return (
    <div className="bg-gray-800/50 border border-indigo-500/20 rounded-lg p-2 backdrop-blur-sm shadow-lg">
      <div className="flex items-center justify-center space-x-1 flex-wrap gap-y-2">
        {views.map((view) => (
          <button
            key={view}
            onClick={() => setView(view)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 ${
              currentView === view
                ? 'bg-indigo-500 text-white shadow-md'
                : 'text-indigo-200 hover:bg-indigo-500/30'
            }`}
          >
            {view}
          </button>
        ))}
      </div>
    </div>
  );
};