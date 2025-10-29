import React from 'react';
import { RoboticsOperationalState } from '../../types';

interface RoboticsViewport3DProps {
    state: RoboticsOperationalState;
}

const RoboticsViewport3D: React.FC<RoboticsViewport3DProps> = ({ state }) => {

    const scale = 20; // pixels per meter

    return (
        <div className="module-panel" style={{ height: '100%' }}>
            <h3>3D Operations Viewport</h3>
            <div className="robotics-3d-viewport">
                <div className="scene">
                    {state.manipulators.map(m => (
                        <div key={m.name} className="robot-manipulator" style={{
                            transform: `translateX(${m.endEffectorPosition.x * scale}px) translateY(${m.endEffectorPosition.z * scale}px) translateZ(${m.endEffectorPosition.y * scale}px)`
                        }} title={m.name} />
                    ))}
                     {state.ugvs.map(ugv => (
                        <div key={ugv.name} className="robot-ugv" style={{
                            transform: `translateX(${ugv.position.lon * scale}px) translateY(0px) translateZ(${ugv.position.lat * scale}px)`
                        }} title={ugv.name} />
                    ))}
                     {state.drones.map(drone => (
                        <div key={drone.name} className="robot-drone" style={{
                            transform: `translateX(${drone.position.x * scale}px) translateY(${drone.position.z * scale}px) translateZ(${drone.position.y * scale}px)`
                        }} title={drone.name} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RoboticsViewport3D;
