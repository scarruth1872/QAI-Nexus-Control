import React from 'react';
import StrategicRoadmap from './StrategicRoadmap';
import DevelopmentPlanner from './DevelopmentPlanner';
import XaiModule from './XaiModule';
import MarlTrainingModule from './MarlTrainingModule';
import { useAppState } from '../contexts/AppContext.tsx';
import GenerativeSimulationWrapper from './GenerativeSimulationWrapper';


const StrategicOpsView: React.FC = () => {
    const { mission } = useAppState();
    return (
        <div className="strategic-ops-grid">
            <div className="span-2"><StrategicRoadmap /></div>
            <div className="span-1"><DevelopmentPlanner /></div>
            <div className="span-1"><XaiModule mission={mission} /></div>
            <div className="span-2"><MarlTrainingModule /></div>
            <div className="span-2"><GenerativeSimulationWrapper /></div>
        </div>
    );
};

export default StrategicOpsView;
