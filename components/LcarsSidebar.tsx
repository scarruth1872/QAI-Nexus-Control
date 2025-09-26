import React from 'react';
import { ControlRoomIcon, RoboticsBayIcon, FabricationIcon, HriIcon, ElectronicsIcon, LogisticsIcon } from './Icons';

interface LcarsSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const views = [
    { name: 'Control Room', icon: ControlRoomIcon },
    { name: 'Main Robotics Bay', icon: RoboticsBayIcon },
    { name: 'Fabrication Workshop', icon: FabricationIcon },
    { name: 'HRI Lab', icon: HriIcon },
    { name: 'Electronics Lab', icon: ElectronicsIcon },
    { name: 'Logistics', icon: LogisticsIcon },
];

const LcarsSidebar: React.FC<LcarsSidebarProps> = ({ activeView, onViewChange }) => {
  return (
    <nav className="lcars-sidebar">
        <div className="lcars-sidebar-upper">
            {views.map((view) => (
              <button
                key={view.name}
                className={`lcars-btn ${activeView === view.name ? 'active' : ''}`}
                onClick={() => onViewChange(view.name)}
              >
                  <view.icon className="inline-block mr-2 h-5 w-5" />
                  {view.name.toUpperCase()}
              </button>
            ))}
        </div>
    </nav>
  );
};

export default LcarsSidebar;
