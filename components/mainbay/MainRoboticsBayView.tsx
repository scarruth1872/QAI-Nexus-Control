import React from 'react';
import MotionCaptureStatus from './MotionCaptureStatus';
import GantryControl from './GantryControl';
import EnvironmentControl from './EnvironmentControl';
import RobotOperationsLog from './RobotOperationsLog';
import CoreInfrastructurePanel from '../robotics/RoboticsFleetStatus';
import { useAppState } from '../../contexts/AppContext.tsx';

const MainRoboticsBayView: React.FC = () => {
    const {
        arasLabState,
        roboticsState,
        handleSetManipulatorTarget,
        handleSetGripperState,
        handleSetUgvWaypoint
    } = useAppState();
    
    return (
        <div className="main-bay-grid-upgraded">
            <div className="mb-infra-panel module-panel overflow-y-auto">
                 <h3>Core Robotic Infrastructure & Control</h3>
                 <CoreInfrastructurePanel
                    state={roboticsState}
                    onSetManipulatorTarget={handleSetManipulatorTarget}
                    onSetGripperState={handleSetGripperState}
                    onSetUgvWaypoint={handleSetUgvWaypoint}
                 />
            </div>
            <div className="mb-support-panel">
                <MotionCaptureStatus status={arasLabState.mainBay.motionCapture} />
                <GantryControl gantry={arasLabState.mainBay.gantryCrane} />
                <EnvironmentControl environment={arasLabState.mainBay.environment} />
            </div>
            <div className="mb-log-panel">
                <RobotOperationsLog logs={arasLabState.mainBay.operationsLog} />
            </div>
        </div>
    );
};

export default MainRoboticsBayView;
