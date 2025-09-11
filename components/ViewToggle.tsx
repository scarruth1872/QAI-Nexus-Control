import React from 'react';
// FIX: Corrected import path for types to be a relative path.
import { View } from '../types';

interface ViewToggleProps {
  currentView: View;
  onViewChange: (view: View) => void;
  isMissionActive: boolean;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ currentView, onViewChange, isMissionActive }) => {
  const viewOptions: { id: View; label: string }[] = [
    { id: 'mission', label: isMissionActive ? 'Dashboard' : 'Mission Control' },
    { id: 'explorer', label: 'Cognitive Explorer' },
    { id: 'orchestrator', label: 'Orchestrator Chat' },
    { id: 'system', label: 'System Integrity' },
    { id: 'knowledge', label: 'Knowledge Core' },
    { id: 'roadmap', label: 'Roadmap' },
  ];

  return (
    <div className="flex justify-center my-8">
      <div className="bg-gray-800/50 border border-indigo-500/30 rounded-full p-1 flex space-x-1 backdrop-blur-sm flex-wrap justify-center">
        {viewOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onViewChange(option.id)}
            className={`px-4 md:px-6 py-2 text-sm font-semibold rounded-full transition-colors duration-300 relative my-1 ${
              currentView === option.id
                ? 'text-white'
                : 'text-indigo-300 hover:bg-gray-700/50'
            }`}
          >
            {currentView === option.id && (
              <span className="absolute inset-0 bg-indigo-600 rounded-full z-0" />
            )}
            <span className="relative z-10">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
