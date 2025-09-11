
import React from 'react';
// FIX: Corrected import path for types to be a relative path.
import { Mission } from '../types';

export const FinalReport: React.FC<{ mission: Mission }> = ({ mission }) => {
  return (
    <div className="animate-fade-in-up max-w-4xl mx-auto bg-gray-800/50 border border-indigo-500/20 rounded-lg p-6 backdrop-blur-sm shadow-2xl shadow-indigo-500/10">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-indigo-300">Final Mission Report</h2>
        <p className="mt-2 text-lg text-indigo-200/80">
          Objective: {mission.objective}
        </p>
      </div>
      
      <div className="prose prose-invert prose-sm md:prose-base mx-auto max-w-none text-gray-300 prose-headings:text-indigo-300 prose-strong:text-indigo-200">
        {mission.finalReport?.split('\n').map((paragraph, index) => {
            if (paragraph.trim() === '') return null;
            if (/^\d+\..*$/.test(paragraph) || /^\*\*\s?.*\s?\*\*$/.test(paragraph)) {
                return <h3 key={index} className="font-bold mt-4 mb-2">{paragraph.replace(/\*|^\d+\.\s*/g, '')}</h3>;
            }
            return <p key={index} className="mb-2">{paragraph}</p>;
        })}
      </div>
      
      <div className="text-center mt-8">
        <span className={`px-4 py-2 font-semibold rounded-full text-base ${
          mission.status === 'completed' ? 'bg-green-500/20 text-green-300' : 'bg-rose-500/20 text-rose-300'
        }`}>
          Mission Status: {mission.status === 'completed' ? 'Success' : 'Failed'}
        </span>
      </div>
    </div>
  );
};
