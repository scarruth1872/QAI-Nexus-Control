import React from 'react';
import AgentPanel from '../AgentPanel';
import VideoWall from './VideoWall';
import HpcClusterMonitor from './HpcClusterMonitor';
import DataStorageMonitor from './DataStorageMonitor';
import NetworkCoreMonitor from './NetworkCoreMonitor';
import PowerManagementPanel from './PowerManagementPanel';
import { useAppState } from '../../contexts/AppContext.tsx';

const ControlRoomView: React.FC = () => {
    // FIX: Renamed `onSendMessage` to `handleSendMessage` to match the AppContext state.
    const { agents, arasLabState, agentChats, handleSendMessage, handleGenerateLabReport } = useAppState();
    const agent = agents.find(a => a.name === 'ARAS');

    if (!agent) {
        return <div>ARAS Agent not found.</div>;
    }

    return (
        <div className="control-room-grid">
            <div className="cr-videowall">
                <VideoWall />
            </div>
            <div className="cr-systems module-panel">
                 <h3>Systems Overview</h3>
                 <div className="systems-grid">
                    <HpcClusterMonitor 
                        clusterState={arasLabState.controlRoom.hpcCluster} 
                        onGenerateReport={() => handleGenerateLabReport("HPC Cluster Performance", arasLabState.controlRoom.hpcCluster)}
                    />
                    <DataStorageMonitor 
                        storageState={arasLabState.controlRoom.dataStorage}
                        onGenerateReport={() => handleGenerateLabReport("Data Storage Status", arasLabState.controlRoom.dataStorage)}
                     />
                    <NetworkCoreMonitor 
                        networkState={arasLabState.controlRoom.network}
                        onGenerateReport={() => handleGenerateLabReport("Network Core Status", arasLabState.controlRoom.network)}
                    />
                    <PowerManagementPanel 
                        powerState={arasLabState.controlRoom.power} 
                        onGenerateReport={() => handleGenerateLabReport("Power System Integrity", arasLabState.controlRoom.power)}
                    />
                 </div>
            </div>
            <div className="cr-agent">
                <AgentPanel 
                    agent={agent}
                    chatHistory={agentChats['aras'] || []}
                    onSendMessage={handleSendMessage}
                />
            </div>
        </div>
    );
};

export default ControlRoomView;