// Fix: Implemented the main application component with state management, view routing, and logic for handling missions and agent interactions.
import React, { useState, useEffect, useCallback } from 'react';
import LcarsLayout from './components/LcarsLayout';
import ControlRoomView from './components/controlroom/ControlRoomView';
import MainRoboticsBayView from './components/mainbay/MainRoboticsBayView';
import FabricationWorkshopView from './components/fabrication/FabricationWorkshopView';
import HriLabView from './components/hri/HriLabView';
import ElectronicsLabView from './components/electronics/ElectronicsLabView';
import LogisticsZoneView from './components/logistics/LogisticsZoneView';

import { Agent, AgentChats, ArasLabState, RoboticsOperationalState, Coordinates3D, Coordinates2D } from './types';
import { getArasOverseerResponse, generateLabReport } from './services/geminiService';

const initialAgent: Agent = {
    id: 'eta-7',
    name: 'Eta-7 (ARAS Overseer)',
    role: 'Advanced Robotics & Autonomous Systems Lab AI',
    status: 'NOMINAL',
    task: 'Monitoring all lab systems and operations.',
    performance: 99,
    avatar: 'https://picsum.photos/seed/eta7/100/100'
};

const initialRoboticsState: RoboticsOperationalState = {
    ros: { status: 'ACTIVE', version: 'Galactic (vX.Y.Z)' },
    simulations: [
        { name: 'Gazebo Robotics Suite', status: 'ACTIVE', fidelity: 98.7, coverage: 95, validation: 88 },
        { name: 'NVIDIA Isaac Sim', status: 'ACTIVE', fidelity: 98.7, coverage: 95, validation: 88 }
    ],
    sensorFusion: {
        status: 'ONLINE',
        compute: 'GPU: NVIDIA A100 x 4',
        sensors: [
            { type: 'LIDAR', model: 'Velodyne VLP-32C', description: 'High-resolution 3D environmental mapping.' },
            { type: 'CAMERAS', model: 'Stereo Vision (Intel Realsense D455) & Hyperspectral Imaging', description: 'Object recognition, material composition analysis, damage detection.' },
            { type: 'FORCE-TORQUE', model: 'ATI Axia80 & OptoForce 3D', description: 'Precision haptic feedback for delicate manipulation and material characterization.' }
        ],
        latency: 1.8
    },
    manipulators: [
        { name: 'KUKA LBR iiwa 14 R820', dof: 7, status: 'ACTIVE', task: 'Ultra-sensitive manipulation for bio-material handling and micro-assembly.', position: {x: 0, y: 0, z: 1}, targetPosition: {x: 0, y: 0, z: 1}, gripperStatus: 'Open', forceFeedback: {x: 0, y: 0, z: 0} },
        { name: 'UR5e', dof: 6, status: 'ACTIVE', task: 'Flexible platform for experimental setup and environmental interaction.', position: {x: 2, y: 2, z: 0.5}, targetPosition: {x: 2, y: 2, z: 0.5}, gripperStatus: 'Open', forceFeedback: {x: 0, y: 0, z: 0} }
    ],
    mobilePlatforms: [
        { name: 'Custom Modular UGV', status: 'ACTIVE', task: 'Autonomous navigation, environmental monitoring, and mobile support for manipulators.', position: {x: 5, y: 5}, velocity: 0, heading: 0, currentWaypoint: null },
        { name: 'Humanoid Robotics Platform (Developmental)', status: 'STANDBY', task: 'Advanced bipedal locomotion and dexterous interaction in complex human-centric environments.', position: {x: 10, y: 10}, velocity: 0, heading: 0, currentWaypoint: null }
    ],
    controlLoopFrequency: 1.2,
    executionProtocols: [],
    perceptionFeeds: [],
    safetySystems: []
};


const initialLabState: ArasLabState = {
    controlRoom: {
        hpcCluster: {
            servers: [
                { id: 'gpu-01', type: 'GPU', load: 45, temp: 65, status: 'Online' },
                { id: 'gpu-02', type: 'GPU', load: 60, temp: 72, status: 'Online' },
                { id: 'cpu-01', type: 'CPU', load: 30, temp: 55, status: 'Online' },
            ],
            aiTraining: { job: 'Bio-Synth Voxel Prediction', progress: 75, eta: '42 minutes' }
        },
        dataStorage: { total: 5.2, used: 3.8, readSpeed: 25.4, writeSpeed: 18.2 },
        network: { bandwidth: 89.2, latency: 1.2, status: 'Secure' },
        power: { upsStatus: 'Online', load: 68, backupTime: '120 minutes' }
    },
    mainBay: {
        motionCapture: { status: 'Active', accuracy: 0.998 },
        gantryCrane: { status: 'Idle', position: { x: 10, y: 5, z: 7 } },
        environment: { lighting: 80, floor: 'Flat', temperature: 22 },
        operationsLog: ['[10:34:12] Unit UGV-02 completed navigation test pattern.']
    },
    robotics: initialRoboticsState,
    fabrication: {
        printers: [
            { id: 'FDM-01', type: 'FDM', status: 'Printing', job: 'Mounting Bracket', progress: 65 },
            { id: 'SLA-01', type: 'SLA', status: 'Idle', job: 'N/A', progress: 0 },
            { id: 'SLS-01', type: 'SLS', status: 'Maintenance', job: 'N/A', progress: 0 },
        ],
        cnc: { id: 'CNC-01', status: 'Idle', job: 'N/A' },
        laserCutter: { id: 'LC-01', status: 'Idle', job: 'N/A' },
        safety: { ventilation: 'Active', fireSuppression: 'Nominal' },
        materials: [
            { id: 'PLA-BLK', name: 'PLA Filament (Black)', stock: 85 },
            { id: 'AL-6061', name: 'Aluminum 6061 Billet', stock: 92 },
        ]
    },
    hriLab: {
        ambience: { noiseLevel: 25, lighting: 'Soft White' },
        biometrics: { status: 'Standby' },
        session: { status: 'Inactive', participants: 0 },
    },
    electronicsLab: {
        esdProtection: 'Active',
        equipment: [{ id: 'OSC-01', name: 'Oscilloscope', status: 'Available' }, { id: 'SA-01', name: 'Spectrum Analyzer', status: 'In Use' }],
        cleanRoom: { status: 'Nominal', particulates: 5 },
    },
    logistics: {
        asrs: { status: 'Active', lastMovement: 'Bin 42-A to Assembly' },
        shipments: { incoming: 2, outgoing: 1 },
        secureStorage: { occupancy: 40 },
    }
};

const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;
const distance3D = (p1: Coordinates3D, p2: Coordinates3D) => Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2) + Math.pow(p1.z - p2.z, 2));
const distance2D = (p1: Coordinates2D, p2: Coordinates2D) => Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));


const App: React.FC = () => {
    const [view, setView] = useState('Control Room');
    const [agent] = useState<Agent>(initialAgent);
    const [labState, setLabState] = useState<ArasLabState>(initialLabState);
    const [agentChats, setAgentChats] = useState<AgentChats>({});

    // Main simulation loop for the entire lab
    useEffect(() => {
        let step = 0;
        const interval = setInterval(() => {
            step++;
            setLabState(prev => {
                // --- Fast updates (every 100ms) for robotics control loops ---
                const newRoboticsState = JSON.parse(JSON.stringify(prev.robotics));
                
                // Update manipulator positions via linear interpolation (lerp)
                newRoboticsState.manipulators = prev.robotics.manipulators.map(m => {
                    const dist = distance3D(m.position, m.targetPosition);
                    if (dist > 0.01) {
                        return {
                            ...m,
                            status: 'MOVING',
                            position: {
                                x: lerp(m.position.x, m.targetPosition.x, 0.1),
                                y: lerp(m.position.y, m.targetPosition.y, 0.1),
                                z: lerp(m.position.z, m.targetPosition.z, 0.1),
                            },
                            forceFeedback: { x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2, z: 5 + (Math.random() - 0.5) * 2 }
                        };
                    }
                    return { ...m, status: 'ACTIVE', forceFeedback: { x: 0, y: 0, z: 0 } };
                });

                // Update mobile platform positions towards waypoints
                newRoboticsState.mobilePlatforms = prev.robotics.mobilePlatforms.map(p => {
                    if (p.currentWaypoint) {
                        const dist = distance2D(p.position, p.currentWaypoint);
                        if (dist > 0.1) {
                            const angle = Math.atan2(p.currentWaypoint.y - p.position.y, p.currentWaypoint.x - p.position.x);
                            const speed = 1.5; // m/s
                            return {
                                ...p, status: 'MOVING', velocity: speed, heading: angle * (180 / Math.PI),
                                position: { x: p.position.x + Math.cos(angle) * speed * 0.1, y: p.position.y + Math.sin(angle) * speed * 0.1 }
                            };
                        } else {
                            return { ...p, status: 'ACTIVE', velocity: 0, currentWaypoint: null }; // Arrived
                        }
                    }
                    return p;
                });

                // --- Slower updates (every 3 seconds) for ambient systems ---
                let newControlRoomState = prev.controlRoom;
                let newMainBayState = prev.mainBay;
                if (step % 30 === 0) {
                     const newLog = `[${new Date().toLocaleTimeString()}] Autonomous system diagnostic cycle complete. Status: NOMINAL.`;
                     newControlRoomState = {
                        ...prev.controlRoom,
                        hpcCluster: {
                            ...prev.controlRoom.hpcCluster,
                            servers: prev.controlRoom.hpcCluster.servers.map(s => ({...s, load: Math.max(20, s.load + (Math.random() - 0.5) * 10), temp: Math.max(50, s.temp + (Math.random() - 0.5) * 5) }))
                        },
                        network: { ...prev.controlRoom.network, bandwidth: 85 + Math.random() * 10, latency: 1.1 + Math.random() * 0.3 }
                    };
                    newMainBayState = {
                        ...prev.mainBay,
                        operationsLog: [newLog, ...prev.mainBay.operationsLog.slice(0, 50)],
                    }
                }

                return {
                    ...prev,
                    robotics: newRoboticsState,
                    controlRoom: newControlRoomState,
                    mainBay: newMainBayState,
                }
            });
        }, 100);
        return () => clearInterval(interval);
    }, []);
    
    const handleGenerateReport = useCallback(async (topic: string, data: any) => {
        try {
            const report = await generateLabReport(topic, data);
            const reportMessage = { sender: agent.id, text: report, timestamp: new Date().toISOString() };
            setAgentChats(prev => ({
                ...prev,
                [agent.id]: [...(prev[agent.id] || []), reportMessage]
            }));
        } catch (error) {
            console.error("Failed to generate report:", error);
            const errorMessage = { sender: agent.id, text: "Error: Unable to generate report.", timestamp: new Date().toISOString() };
            setAgentChats(prev => ({
                ...prev,
                [agent.id]: [...(prev[agent.id] || []), errorMessage]
            }));
        }
    }, [agent]);

    const handleSendAgentMessage = useCallback(async (agentId: string, text: string) => {
        const userMessage = { sender: 'user', text, timestamp: new Date().toISOString() };
        
        setAgentChats(prev => ({
            ...prev,
            [agentId]: [...(prev[agentId] || []), userMessage]
        }));
        
        try {
            const responseText = await getArasOverseerResponse(agent, text, agentChats[agentId] || [], labState);
            const agentMessage = { sender: agentId, text: responseText, timestamp: new Date().toISOString() };
             setAgentChats(prev => ({
                ...prev,
                [agentId]: [...(prev[agentId] || []), agentMessage]
            }));
        } catch (error) {
            console.error("Failed to get agent response:", error);
            const errorMessage = { sender: agentId, text: "Error: Unable to get response.", timestamp: new Date().toISOString() };
             setAgentChats(prev => ({
                ...prev,
                [agentId]: [...(prev[agentId] || []), errorMessage]
            }));
        }
    }, [agent, agentChats, labState]);
    
    const handleSetManipulatorTarget = useCallback((manipulatorName: string, target: Coordinates3D) => {
        setLabState(prev => ({
            ...prev,
            robotics: {
                ...prev.robotics,
                manipulators: prev.robotics.manipulators.map(m => m.name === manipulatorName ? { ...m, targetPosition: target } : m)
            }
        }));
    }, []);
    
    const handleSetGripperState = useCallback((manipulatorName: string, gripperStatus: 'Open' | 'Closed') => {
        setLabState(prev => ({
            ...prev,
            robotics: {
                ...prev.robotics,
                manipulators: prev.robotics.manipulators.map(m => m.name === manipulatorName ? { ...m, gripperStatus } : m)
            }
        }));
    }, []);
    
    const handleSetUgvWaypoint = useCallback((platformName: string, waypoint: Coordinates2D) => {
        setLabState(prev => ({
            ...prev,
            robotics: {
                ...prev.robotics,
                mobilePlatforms: prev.robotics.mobilePlatforms.map(p => p.name === platformName ? { ...p, currentWaypoint: waypoint } : p)
            }
        }));
    }, []);


    const renderView = () => {
        switch (view) {
            case 'Control Room':
                return <ControlRoomView 
                            agent={agent}
                            labState={labState}
                            chatHistory={agentChats[agent.id] || []}
                            onSendMessage={handleSendAgentMessage}
                            onGenerateReport={handleGenerateReport}
                        />;
            case 'Main Robotics Bay':
                return <MainRoboticsBayView 
                            bayState={labState.mainBay}
                            roboticsState={labState.robotics}
                            onSetManipulatorTarget={handleSetManipulatorTarget}
                            onSetGripperState={handleSetGripperState}
                            onSetUgvWaypoint={handleSetUgvWaypoint}
                        />;
            case 'Fabrication Workshop':
                return <FabricationWorkshopView fabState={labState.fabrication} />;
            case 'HRI Lab':
                return <HriLabView hriState={labState.hriLab} />;
            case 'Electronics Lab':
                return <ElectronicsLabView electronicsState={labState.electronicsLab} />;
            case 'Logistics':
                return <LogisticsZoneView logisticsState={labState.logistics} />;
            default:
                return <div>View not found</div>;
        }
    };

    return (
        <LcarsLayout activeView={view} onViewChange={setView}>
            {renderView()}
        </LcarsLayout>
    );
};

export default App;