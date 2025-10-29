import React from 'react';
import { Agent } from '../../types';
import RoboticsFleetStatus from './RoboticsFleetStatus';
import RoboticsTaskQueue from './RoboticsTaskQueue';
import SensorFusionDisplay from './SensorFusionDisplay';
import RoboticsViewport3D from './RoboticsViewport3D';
import { useAppState } from '../../contexts/AppContext.tsx';

interface Eta7DashboardProps {
    agent: Agent;
    onReturn: () => void;
}

const Eta7Dashboard: React.FC<Eta7DashboardProps> = ({ agent, onReturn }) => {
    const {
        roboticsState,
        handleSetManipulatorTarget,
        handleSetGripperState,
        handleSetUgvWaypoint
    } = useAppState();

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3>Robotics & Automation Dashboard: {agent.name}</h3>
                <button onClick={onReturn}>Return to Comms</button>
            </div>
            <div className="robotics-dashboard-grid">
                <div className="robotics-viewport"><RoboticsViewport3D state={roboticsState} /></div>
                <div className="robotics-fleet-status">
                    <RoboticsFleetStatus
                         state={roboticsState}
                         onSetManipulatorTarget={handleSetManipulatorTarget}
                         onSetGripperState={handleSetGripperState}
                         onSetUgvWaypoint={handleSetUgvWaypoint}
                    />
                </div>
                <div className="robotics-task-queue"><RoboticsTaskQueue /></div>
                <div className="robotics-sensor-fusion"><SensorFusionDisplay /></div>
            </div>
        </div>
    );
};

export default Eta7Dashboard;
