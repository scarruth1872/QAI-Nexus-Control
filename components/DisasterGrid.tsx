import React from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { GridCellState, MarlAgent, Civilian } from '../types';
import GridCell from './GridCell';

interface DisasterGridProps {
    grid: GridCellState[][];
    agents: MarlAgent[];
    civilians: Civilian[];
}

const DisasterGrid: React.FC<DisasterGridProps> = ({ grid, agents, civilians }) => {
    return (
        <div className="disaster-grid" style={{ gridTemplateColumns: `repeat(${grid.length}, 1fr)` }}>
            {grid.map((row, y) => 
                row.map((cell, x) => (
                    <GridCell 
                        key={`${x}-${y}`} 
                        cell={cell}
                        agent={agents.find(a => a.x === x && a.y === y)}
                        civilian={civilians.find(c => c.x === x && c.y === y)}
                    />
                ))
            )}
        </div>
    );
};

export default DisasterGrid;