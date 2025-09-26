// Fix: Replaced placeholder content with a valid React component.
import React from 'react';
import Header from './Header';
// Fix: Corrected import path for LcarsSidebar.
import LcarsSidebar from './LcarsSidebar';

interface LcarsLayoutProps {
  children: React.ReactNode;
  activeView: string;
  onViewChange: (view: string) => void;
}

const LcarsLayout: React.FC<LcarsLayoutProps> = ({ children, activeView, onViewChange }) => {
  return (
    <div className="lcars-container">
      <Header />
      <LcarsSidebar activeView={activeView} onViewChange={onViewChange} />
      <main className="lcars-main">
        {children}
      </main>
      <footer className="lcars-footer">
        <span>SYSTEM ONLINE</span>
        <span>AI CORE: GEMINI 2.5 FLASH</span>
      </footer>
    </div>
  );
};

export default LcarsLayout;