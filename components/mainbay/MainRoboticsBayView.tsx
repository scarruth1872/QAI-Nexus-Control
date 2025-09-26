import React from 'react';
import { MainBayState, RoboticsOperationalState, Coordinates3D, Coordinates2D } from '../../types';
import MotionCaptureStatus from './MotionCaptureStatus';
import GantryControl from './GantryControl';
import EnvironmentControl from './EnvironmentControl';
import RobotOperationsLog from './RobotOperationsLog';
import CoreInfrastructurePanel from '../robotics/RoboticsFleetStatus';

interface MainRoboticsBayViewProps {
    bayState: MainBayState;
    roboticsState: RoboticsOperationalState;
    onSetManipulatorTarget: (name: string, target: Coordinates3D) => void;
    onSetGripperState: (name: string, state: 'Open' | 'Closed') => void;
    onSetUgvWaypoint: (name: string, waypoint: Coordinates2D) => void;
}

const MainRoboticsBayView: React.FC<MainRoboticsBayViewProps> = ({ 
    bayState, 
    roboticsState,
    onSetManipulatorTarget,
    onSetGripperState,
    onSetUgvWaypoint
}) => {
    return (
        <div className="main-bay-grid-upgraded">
            <div className="mb-infra-panel module-panel overflow-y-auto">
                 <h3>Core Robotic Infrastructure & Control</h3>
                 <CoreInfrastructurePanel
                    state={roboticsState}
                    onSetManipulatorTarget={onSetManipulatorTarget}
                    onSetGripperState={onSetGripperState}
                    onSetUgvWaypoint={onSetUgvWaypoint}
                 />
            </div>
            <div className="mb-support-panel">
                <MotionCaptureStatus status={bayState.motionCapture} />
                <GantryControl gantry={bayState.gantryCrane} />
                <EnvironmentControl environment={bayState.environment} />
            </div>
            <div className="mb-log-panel">
                <RobotOperationsLog logs={bayState.operationsLog} />
            </div>
        </div>
    );
};

export default MainRoboticsBayView;