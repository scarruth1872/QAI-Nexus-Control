import React from 'react';
import StrategicRoadmap from './StrategicRoadmap';
import DevelopmentPlanner from './DevelopmentPlanner';
import MarlTrainingModule from './MarlTrainingModule';
import MissionArchive from './MissionArchive';
import DgmPanel from './DgmPanel';
import GenerativeSimulationWrapper from './GenerativeSimulationWrapper';

const StrategicOpsView: React.FC = () => {
    return (
        <div className="view-grid" style={{gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto 1fr' }}>
            <StrategicRoadmap />
            <DevelopmentPlanner />
            <div style={{gridColumn: '1 / -1'}}>
              <MarlTrainingModule />
            </div>
            <GenerativeSimulationWrapper />
            <MissionArchive />
            <DgmPanel />
        </div>
    );
};

export default StrategicOpsView;
