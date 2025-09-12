import React from 'react';

export type View = 'Mission Control' | 'Agent Explorer' | 'System Integrity' | 'Knowledge Core' | 'Strategic Roadmap' | 'Orchestrator' | 'QAE Interface' | 'Archives';

const views: View[] = [
    'Mission Control',
    'Agent Explorer',
    'System Integrity',
    'Knowledge Core',
    'Strategic Roadmap',
    'Orchestrator',
    'QAE Interface',
    'Archives'
];

interface ViewToggleProps {
  activeView: View;
  onViewChange: (view: View) => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ activeView, onViewChange }) => {
  return (
    <div className="mb-8 flex flex-wrap justify-center gap-2">
      {views.map(view => (
        <button
          key={view}
          onClick={() => onViewChange(view)}
          className={`px-4 py-2 text-xs font-semibold rounded-full transition-colors duration-300 ${
            activeView === view
              ? 'bg-indigo-500 text-white shadow-md'
              : 'bg-gray-800/60 text-indigo-300 hover:bg-indigo-500/50 hover:text-white'
          }`}
        >
          {view}
        </button>
      ))}
    </div>
  );
};
