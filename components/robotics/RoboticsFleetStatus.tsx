import React, { useState } from 'react';
import { RoboticsOperationalState, Coordinates3D, Coordinates2D } from '../../types';
import StatusIndicator from './ExecutionCommand'; // Repurposed to StatusIndicator
import SimulationStatus from './SimulationViewport'; // Repurposed to SimulationStatus
import SensorList from './SensorFusionDisplay'; // Repurposed to SensorList

interface DirectControlInterfaceProps {
    manipulators: RoboticsOperationalState['manipulators'];
    mobilePlatforms: RoboticsOperationalState['mobilePlatforms'];
    onSetManipulatorTarget: (name: string, target: Coordinates3D) => void;
    onSetGripperState: (name: string, state: 'Open' | 'Closed') => void;
    onSetUgvWaypoint: (name: string, waypoint: Coordinates2D) => void;
}

const DirectControlInterface: React.FC<DirectControlInterfaceProps> = ({ manipulators, mobilePlatforms, onSetManipulatorTarget, onSetGripperState, onSetUgvWaypoint }) => {
    const [targets, setTargets] = useState<Record<string, Coordinates3D>>(
        manipulators.reduce((acc, m) => ({ ...acc, [m.name]: { ...m.targetPosition } }), {})
    );
    const [waypoints, setWaypoints] = useState<Record<string, Coordinates2D>>(
        mobilePlatforms.reduce((acc, p) => ({ ...acc, [p.name]: { x: p.position.x, y: p.position.y } }), {})
    );

    const handleTargetChange = (name: string, axis: 'x' | 'y' | 'z', value: string) => {
        setTargets(prev => ({ ...prev, [name]: { ...prev[name], [axis]: parseFloat(value) || 0 } }));
    };
    
    const handleWaypointChange = (name: string, axis: 'x' | 'y', value: string) => {
        setWaypoints(prev => ({ ...prev, [name]: { ...prev[name], [axis]: parseFloat(value) || 0 } }));
    };

    return (
        <div className="direct-control-panel">
            <h4 className="!text-yellow-400">Direct Control Interface</h4>
            {manipulators.map(m => (
                <div key={m.name} className="sub-panel border-t border-gray-700 pt-2 mt-2">
                    <p className="sub-panel-title">{m.name}</p>
                    <div className="control-feedback-grid">
                        <span>Pos: {m.position.x.toFixed(2)}, {m.position.y.toFixed(2)}, {m.position.z.toFixed(2)}</span>
                        <span>Force: {m.forceFeedback.x.toFixed(1)}, {m.forceFeedback.y.toFixed(1)}, {m.forceFeedback.z.toFixed(1)} N</span>
                        <span>Target: {m.targetPosition.x.toFixed(2)}, {m.targetPosition.y.toFixed(2)}, {m.targetPosition.z.toFixed(2)}</span>
                        <span>Gripper: {m.gripperStatus}</span>
                    </div>
                    <div className="control-input-group">
                        <label>TGT:</label>
                        <input type="number" value={targets[m.name].x} onChange={e => handleTargetChange(m.name, 'x', e.target.value)} />
                        <input type="number" value={targets[m.name].y} onChange={e => handleTargetChange(m.name, 'y', e.target.value)} />
                        <input type="number" value={targets[m.name].z} onChange={e => handleTargetChange(m.name, 'z', e.target.value)} />
                        <button className="text-xs p-1" onClick={() => onSetManipulatorTarget(m.name, targets[m.name])}>Move</button>
                    </div>
                    <div className="control-actions">
                        <button onClick={() => onSetGripperState(m.name, 'Open')}>Open Gripper</button>
                        <button onClick={() => onSetGripperState(m.name, 'Closed')}>Close Gripper</button>
                    </div>
                </div>
            ))}
             {mobilePlatforms.filter(p => p.name.includes("UGV")).map(p => (
                 <div key={p.name} className="sub-panel border-t border-gray-700 pt-2 mt-2">
                    <p className="sub-panel-title">{p.name}</p>
                     <div className="control-feedback-grid">
                        <span>Pos: {p.position.x.toFixed(2)}, {p.position.y.toFixed(2)}</span>
                        <span>Velocity: {p.velocity.toFixed(2)} m/s</span>
                        <span>Heading: {p.heading.toFixed(1)}°</span>
                        <span>Waypoint: {p.currentWaypoint ? `${p.currentWaypoint.x}, ${p.currentWaypoint.y}`: 'None'}</span>
                    </div>
                    <div className="control-input-group">
                         <label>WP:</label>
                        <input type="number" value={waypoints[p.name].x} onChange={e => handleWaypointChange(p.name, 'x', e.target.value)} />
                        <input type="number" value={waypoints[p.name].y} onChange={e => handleWaypointChange(p.name, 'y', e.target.value)} />
                        <button className="text-xs p-1" onClick={() => onSetUgvWaypoint(p.name, waypoints[p.name])}>Set Waypoint</button>
                    </div>
                </div>
             ))}
        </div>
    );
};


interface CoreInfrastructurePanelProps {
    state: RoboticsOperationalState;
    onSetManipulatorTarget: (name: string, target: Coordinates3D) => void;
    onSetGripperState: (name: string, state: 'Open' | 'Closed') => void;
    onSetUgvWaypoint: (name: string, waypoint: Coordinates2D) => void;
}

const CoreInfrastructurePanel: React.FC<CoreInfrastructurePanelProps> = ({ state, onSetManipulatorTarget, onSetGripperState, onSetUgvWaypoint }) => {
    return (
        <div>
            {/* ROS 2 & Simulation Environments */}
            <div className="eta-op-section">
                <h4>ROS 2 &amp; Simulation Environments</h4>
                <div className="sub-panel">
                    <StatusIndicator status={state.ros.status} text={`ROS 2 Core Framework: ${state.ros.version}`} />
                </div>
                <div className="sub-panel">
                    <p className="sub-panel-title">Realistic Simulation Environments:</p>
                    <SimulationStatus simulations={state.simulations} />
                </div>
            </div>

            {/* Sensor Fusion Platforms */}
            <div className="eta-op-section">
                <h4>Sensor Fusion Platforms</h4>
                <div className="sub-panel">
                    <StatusIndicator status={state.sensorFusion.status} text={`High-Performance Compute Cluster: ${state.sensorFusion.compute}`} />
                </div>
                <div className="sub-panel">
                    <p className="sub-panel-title">Real-time Data Fusion Engine:</p>
                    <SensorList sensors={state.sensorFusion.sensors} />
                    <div className="metrics-group">
                        Fusion Pipeline Latency: Average {state.sensorFusion.latency.toFixed(2)}ms (Critical for real-time adaptation)
                    </div>
                </div>
            </div>

            {/* Precision Manipulator & Mobile Platform Control */}
            <div className="eta-op-section">
                <h4>Precision Manipulator &amp; Mobile Platform Control</h4>
                <div className="sub-panel">
                     <p className="sub-panel-title">Robotic Arms:</p>
                     <ul>
                        {state.manipulators.map(m => (
                            <li key={m.name}>
                                <StatusIndicator status={m.status} text={`${m.name} (${m.dof}-DOF)`} />
                            </li>
                        ))}
                     </ul>
                </div>
                 <div className="sub-panel">
                     <p className="sub-panel-title">Mobile Platforms:</p>
                     <ul>
                        {state.mobilePlatforms.map(p => (
                             <li key={p.name}>
                                <StatusIndicator status={p.status} text={p.name} />
                             </li>
                        ))}
                     </ul>
                </div>
                 <div className="metrics-group">
                    Control Loop Frequency: {state.controlLoopFrequency.toFixed(2)} kHz (Adaptive Dynamics & Impedance Control)
                </div>
                <DirectControlInterface 
                    manipulators={state.manipulators}
                    mobilePlatforms={state.mobilePlatforms}
                    onSetManipulatorTarget={onSetManipulatorTarget}
                    onSetGripperState={onSetGripperState}
                    onSetUgvWaypoint={onSetUgvWaypoint}
                />
            </div>
        </div>
    );
};

export default CoreInfrastructurePanel;