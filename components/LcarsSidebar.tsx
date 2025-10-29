// Fix: Implemented the LcarsSidebar component for application navigation.
import React from 'react';
// FIX: Corrected import path for Icons to be a relative module path.
import { 
    CommandDeckIcon,
    SystemInternalsIcon,
    StrategicOpsIcon,
    KnowledgeBaseIcon,
    ControlRoomIcon, 
    RoboticsBayIcon,
    FabricationIcon,
    HriIcon,
    ElectronicsIcon,
    LogisticsIcon,
    LiveCommsIcon
} from './Icons';


interface LcarsSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const views = [
    { name: 'Command Deck', Icon: CommandDeckIcon },
    { name: 'Live Comms', Icon: LiveCommsIcon },
    { name: 'System Internals', Icon: SystemInternalsIcon },
    { name: 'Strategic Ops', Icon: StrategicOpsIcon },
    { name: 'Knowledge Base', Icon: KnowledgeBaseIcon },
];

const labViews = [
    { name: 'Control Room', Icon: ControlRoomIcon },
    { name: 'Robotics Bay', Icon: RoboticsBayIcon },
    { name: 'Fabrication', Icon: FabricationIcon },
    { name: 'HRI Lab', Icon: HriIcon },
    { name: 'Electronics Lab', Icon: ElectronicsIcon },
    { name: 'Logistics Zone', Icon: LogisticsIcon },
];

const LcarsSidebar: React.FC<LcarsSidebarProps> = ({ activeView, onViewChange }) => {
  return (
    <nav className="lcars-sidebar">
      <div className="lcars-sidebar-title">MAIN MENU</div>
      <div className="lcars-sidebar-buttons">
        {views.map(({name, Icon}) => (
          <button
            key={name}
            className={`lcars-btn ${activeView === name ? 'active' : ''}`}
            onClick={() => onViewChange(name)}
          >
            <Icon />
            <span className="btn-text">{name}</span>
          </button>
        ))}
      </div>
       <div className="lcars-sidebar-title">ARAS FACILITY</div>
        <div className="lcars-sidebar-buttons">
            {labViews.map(({name, Icon}) => (
            <button
                key={name}
                className={`lcars-btn icon-btn ${activeView === name ? 'active' : ''}`}
                onClick={() => onViewChange(name)}
                title={name}
            >
                <Icon />
                <span className="btn-text">{name}</span>
            </button>
            ))}
        </div>
    </nav>
  );
};

export default LcarsSidebar;