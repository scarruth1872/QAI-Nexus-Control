// Fix: Implemented the MarlTrainingModule component with a disaster response simulation.
import React, { useState, useEffect, useCallback } from 'react';
// Fix: Corrected import paths for types and Icons.
import { GridCellState, MarlAgent, Civilian } from '../types';
import DisasterGrid from './DisasterGrid';
import { FireExtinguisherIcon, HeartPulseIcon, UserIcon, WrenchIcon } from './Icons';

const GRID_SIZE = 15;

const createInitialGrid = (): GridCellState[][] => {
    const grid = Array.from({ length: GRID_SIZE }, () => 
        Array.from({ length: GRID_SIZE }, (): GridCellState => ({ type: 'EMPTY', intensity: 0 }))
    );
    // Add some random fires and rubble
    for (let i = 0; i < 20; i++) {
        const x = Math.floor(Math.random() * GRID_SIZE);
        const y = Math.floor(Math.random() * GRID_SIZE);
        if (Math.random() > 0.5) {
            grid[y][x] = { type: 'FIRE', intensity: Math.floor(Math.random() * 5) + 1 };
        } else {
            // Fix: Changed cell type to 'RUBBLE' to align with the updated CellType definition.
            grid[y][x] = { type: 'RUBBLE', intensity: 0 };
        }
    }
    return grid;
};

// Fix: Added missing 'resources' and 'carryingCivilianId' properties to initial agent definitions to match the MarlAgent interface.
const createInitialAgents = (): MarlAgent[] => [
    { id: 'ff1', type: 'FIRE_FIGHTER', x: 1, y: 1, health: 100, resources: 100, carryingCivilianId: null },
    { id: 'med1', type: 'MEDIC', x: 2, y: 1, health: 100, resources: 100, carryingCivilianId: null },
    { id: 'eng1', type: 'ENGINEER', x: 1, y: 2, health: 100, resources: 100, carryingCivilianId: null },
];

// Fix: Added missing 'health' property and set a valid 'TRAPPED' status for initial civilians to match the Civilian interface.
const createInitialCivilians = (): Civilian[] => {
    const civilians: Civilian[] = [];
    for (let i = 0; i < 5; i++) {
        const x = Math.floor(Math.random() * (GRID_SIZE - 5)) + 5;
        const y = Math.floor(Math.random() * (GRID_SIZE - 5)) + 5;
        civilians.push({ id: `civ${i}`, x, y, health: 100, status: 'TRAPPED' });
    }
    return civilians;
};

const MarlTrainingModule: React.FC = () => {
    const [grid, setGrid] = useState<GridCellState[][]>(createInitialGrid);
    const [agents, setAgents] = useState<MarlAgent[]>(createInitialAgents);
    const [civilians, setCivilians] = useState<Civilian[]>(createInitialCivilians);
    const [isRunning, setIsRunning] = useState(false);
    const [steps, setSteps] = useState(0);

    const resetSimulation = useCallback(() => {
        setIsRunning(false);
        setGrid(createInitialGrid());
        setAgents(createInitialAgents());
        setCivilians(createInitialCivilians());
        setSteps(0);
    }, []);

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            // Very simple simulation logic: move agents randomly
            setAgents(prevAgents => prevAgents.map(agent => {
                let { x, y } = agent;
                const move = Math.floor(Math.random() * 4);
                if (move === 0 && y > 0) y--;
                else if (move === 1 && y < GRID_SIZE - 1) y++;
                else if (move === 2 && x > 0) x--;
                else if (move === 3 && x < GRID_SIZE - 1) x++;
                return { ...agent, x, y };
            }));

            // Spread fire
            setGrid(prevGrid => {
                const newGrid = JSON.parse(JSON.stringify(prevGrid));
                for(let y=0; y<GRID_SIZE; y++) {
                    for(let x=0; x<GRID_SIZE; x++) {
                        if(prevGrid[y][x].type === 'FIRE' && Math.random() < 0.1) {
                            const nx = x + (Math.random() > 0.5 ? 1 : -1);
                            const ny = y + (Math.random() > 0.5 ? 1 : -1);
                            if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE && newGrid[ny][nx].type === 'EMPTY') {
                                newGrid[ny][nx] = { type: 'FIRE', intensity: 1 };
                            }
                        }
                    }
                }
                return newGrid;
            });
            
            setSteps(s => s + 1);
        }, 500);

        return () => clearInterval(interval);
    }, [isRunning]);

    // Fix: Changed civilian status check from 'HEALTHY' to 'RESCUED' to match the defined CivilianStatus type.
    const rescuedCount = civilians.filter(c => c.status === 'RESCUED').length;

    return (
        <div className="module-panel">
            <h3>MARL Training Module (Disaster Response Sim)</h3>
            <div className="marl-container">
                <div className="marl-controls">
                    <h4>Simulation Controls</h4>
                    <p>Time Steps: {steps}</p>
                    <p>Civilians Rescued: {rescuedCount} / {civilians.length}</p>
                    <div className="buttons">
                        <button onClick={() => setIsRunning(!isRunning)}>{isRunning ? 'Pause Sim' : 'Start Sim'}</button>
                        <button onClick={resetSimulation}>Reset Sim</button>
                    </div>
                     <h4>Legend</h4>
                    <ul className="legend">
                        <li><FireExtinguisherIcon /> Fire Fighter</li>
                        <li><HeartPulseIcon /> Medic</li>
                        <li><WrenchIcon /> Engineer</li>
                        <li><UserIcon /> Civilian</li>
                        <li className="legend-fire">Fire</li>
                        <li className="legend-rubble">Rubble</li>
                    </ul>
                </div>
                <div className="marl-grid-container">
                    <DisasterGrid grid={grid} agents={agents} civilians={civilians} />
                </div>
            </div>
        </div>
    );
};

export default MarlTrainingModule;