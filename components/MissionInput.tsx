
import React, { useState } from 'react';
import { Spinner } from './Spinner';

interface MissionInputProps {
  onSubmit: (missionText: string) => void;
  isLoading: boolean;
}

export const MissionInput: React.FC<MissionInputProps> = ({ onSubmit, isLoading }) => {
  const [missionText, setMissionText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(missionText);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="bg-gray-800/50 border border-indigo-500/30 rounded-lg p-4 backdrop-blur-sm shadow-2xl shadow-indigo-500/10">
        <label htmlFor="mission-input" className="block text-sm font-medium text-indigo-300 mb-2">
          Define Grand Mission
        </label>
        <textarea
          id="mission-input"
          value={missionText}
          onChange={(e) => setMissionText(e.target.value)}
          placeholder="e.g., Develop a sustainable method for carbon capture to combat climate change."
          className="w-full h-24 p-3 bg-gray-900/70 border border-indigo-700/50 rounded-md text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 resize-none"
          disabled={isLoading}
        />
      </div>
      <div className="mt-6 flex justify-center">
        <button
          type="submit"
          disabled={isLoading || !missionText.trim()}
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900/50 disabled:text-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
        >
          {isLoading ? (
            <>
              <Spinner className="w-5 h-5 mr-2" />
              Deploying Agent...
            </>
          ) : (
            'Deploy Nexus Agent'
          )}
        </button>
      </div>
    </form>
  );
};
