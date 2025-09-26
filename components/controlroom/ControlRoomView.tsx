import React from 'react';
import { Agent, ArasLabState, ChatMessage } from '../../types';
import AgentPanel from '../AgentPanel';
import VideoWall from './VideoWall';
import HpcClusterMonitor from './HpcClusterMonitor';
import DataStorageMonitor from './DataStorageMonitor';
import NetworkCoreMonitor from './NetworkCoreMonitor';
import PowerManagementPanel from './PowerManagementPanel';

interface ControlRoomViewProps {
    agent: Agent;
    labState: ArasLabState;
    chatHistory: ChatMessage[];
    onSendMessage: (agentId: string, text: string) => void;
    onGenerateReport: (topic: string, data: any) => void;
}

const ControlRoomView: React.FC<ControlRoomViewProps> = ({ agent, labState, chatHistory, onSendMessage, onGenerateReport }) => {
    return (
        <div className="control-room-grid">
            <div className="cr-videowall">
                <VideoWall />
            </div>
            <div className="cr-systems module-panel">
                 <h3>Systems Overview</h3>
                 <div className="systems-grid">
                    <HpcClusterMonitor 
                        clusterState={labState.controlRoom.hpcCluster} 
                        onGenerateReport={() => onGenerateReport("HPC Cluster Performance", labState.controlRoom.hpcCluster)}
                    />
                    <DataStorageMonitor 
                        storageState={labState.controlRoom.dataStorage}
                        onGenerateReport={() => onGenerateReport("Data Storage Status", labState.controlRoom.dataStorage)}
                     />
                    <NetworkCoreMonitor 
                        networkState={labState.controlRoom.network}
                        onGenerateReport={() => onGenerateReport("Network Core Status", labState.controlRoom.network)}
                    />
                    <PowerManagementPanel 
                        powerState={labState.controlRoom.power} 
                        onGenerateReport={() => onGenerateReport("Power System Integrity", labState.controlRoom.power)}
                    />
                 </div>
            </div>
            <div className="cr-agent">
                <AgentPanel 
                    agent={agent}
                    chatHistory={chatHistory}
                    onSendMessage={onSendMessage}
                />
            </div>
        </div>
    );
};

export default ControlRoomView;
