
import React from 'react';
import { NexusIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <NexusIcon className="w-10 h-10 text-indigo-400" />
        <h1 className="ml-4 text-3xl font-bold tracking-tighter text-gray-100">
          QAI Nexus Control
        </h1>
      </div>
    </header>
  );
};