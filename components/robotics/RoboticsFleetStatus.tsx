import React from 'react';
import { RoboticsOperationalState, Coordinates3D, Coordinates2D } from '../../types';

interface RoboticsFleetStatusProps {
    state: RoboticsOperationalState;
    onSetManipulatorTarget: (name: string, target: Coordinates3D) => void;
    onSetGripperState: (name: string, state: 'Open' | 'Closed') => void;
    onSetUgvWaypoint: (name: string, waypoint: Coordinates2D) => void;
}

const RoboticsFleetStatus: React.FC<RoboticsFleetStatusProps> = ({ 
    state,
    onSetManipulatorTarget,
    onSetGripperState,
    onSetUgvWaypoint
 }) => {

    const handleRandomManipulatorMove = (name: string) => {
        const target: Coordinates3D = {
            x: Math.random() * 10,
            y: Math.random() * 2,
            z: Math.random() * 4
        };
        onSetManipulatorTarget(name, target);
    };
    
    const handleRandomUgvMove = (name: string) => {
        const waypoint: Coordinates2D = {
            lat: Math.random() * 10,
            lon: Math.random() * 10,
        };
        onSetUgvWaypoint(name, waypoint);
    };

    return (
        <div className="fleet-status-container">
            <h4>Manipulators</h4>
            {state.manipulators.map(m => (
                <div key={m.name} className="fleet-item">
                    <p><strong>{m.name}</strong> - {m.status}</p>
                    <p className="text-xs">Gripper: {m.gripperState} | Pos: ({m.endEffectorPosition.x.toFixed(1)}, {m.endEffectorPosition.y.toFixed(1)}, {m.endEffectorPosition.z.toFixed(1)})</p>
                     <div className="fleet-controls">
                        <button onClick={() => handleRandomManipulatorMove(m.name)}>Move Random</button>
                        <button onClick={() => onSetGripperState(m.name, 'Open')}>Open</button>
                        <button onClick={() => onSetGripperState(m.name, 'Closed')}>Close</button>
                    </div>
                </div>
            ))}
            
            <h4 className="mt-4">UGVs (Unmanned Ground Vehicles)</h4>
            {state.ugvs.map(ugv => (
                <div key={ugv.name} className="fleet-item">
                    <p><strong>{ugv.name}</strong> - {ugv.status}</p>
                    <p className="text-xs">Battery: {ugv.battery}% | Pos: ({ugv.position.lat.toFixed(1)}, {ugv.position.lon.toFixed(1)})</p>
                     <div className="fleet-controls">
                        <button onClick={() => handleRandomUgvMove(ugv.name)}>Set Waypoint</button>
                    </div>
                </div>
            ))}

            <h4 className="mt-4">Drones</h4>
             {state.drones.map(drone => (
                <div key={drone.name} className="fleet-item">
                    <p><strong>{drone.name}</strong> - {drone.status}</p>
                    <p className="text-xs">Battery: {drone.battery}% | Pos: ({drone.position.x.toFixed(1)}, {drone.position.y.toFixed(1)}, {drone.position.z.toFixed(1)})</p>
                </div>
            ))}
        </div>
    );
};

export default RoboticsFleetStatus;