// Fix: Implemented the GridCell component to render cells in the disaster simulation.
import React from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { GridCellState, MarlAgent, Civilian } from '../types';
// FIX: Corrected import path for Icons to be a relative module path.
import { FireExtinguisherIcon, HeartPulseIcon, UserIcon, WrenchIcon } from './Icons';

interface GridCellProps {
    cell: GridCellState;
    agent?: MarlAgent;
    civilian?: Civilian;
}

const AgentIcon: React.FC<{type: MarlAgent['type']}> = ({ type }) => {
    switch (type) {
        case 'FIRE_FIGHTER': return <FireExtinguisherIcon />;
        case 'MEDIC': return <HeartPulseIcon />;
        case 'ENGINEER': return <WrenchIcon />;
        default: return null;
    }
};

const GridCell: React.FC<GridCellProps> = ({ cell, agent, civilian }) => {
    const cellClasses = `grid-cell cell-type-${cell.type.toLowerCase()}`;
    const intensityStyle = cell.type === 'FIRE' ? { opacity: 0.2 + cell.intensity * 0.16 } : {};

    return (
        <div className={cellClasses} style={intensityStyle}>
            <div className="cell-content">
                {agent && <div className="agent-icon"><AgentIcon type={agent.type} /></div>}
                {civilian && <div className={`civilian-icon civilian-${civilian.status.toLowerCase()}`}><UserIcon /></div>}
            </div>
        </div>
    );
};

export default GridCell;