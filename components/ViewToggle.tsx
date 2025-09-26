// Fix: Replaced placeholder content with a valid React component.
import React from 'react';

interface ViewToggleProps {
  views: string[];
  activeView: string;
  onViewChange: (view: string) => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ views, activeView, onViewChange }) => {
  return (
    <div className="view-toggle">
      {views.map(view => (
        <button
          key={view}
          className={activeView === view ? 'active' : ''}
          onClick={() => onViewChange(view)}
        >
          {view}
        </button>
      ))}
    </div>
  );
};

export default ViewToggle;
