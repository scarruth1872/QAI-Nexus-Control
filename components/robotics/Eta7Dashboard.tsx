import React, { useState, useEffect } from 'react';
import { Agent, DelegatedTaskResult, SimulationResult, BioAssayResult, RoboticsOperationalState, Coordinates3D, Coordinates2D } from '../../types';
import CoreInfrastructurePanel from './RoboticsFleetStatus'; // Repurposed to CoreInfrastructurePanel
import IntegrationProtocolsPanel from './RoboticsTaskQueue'; // Repurposed to IntegrationProtocolsPanel
import { executeFabricationTask, executeBioProtocolTask } from '../../services/geminiService';

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
    executionProtocols: [
        { interface: 'Nanomaterials Module', activeProtocol: '[FAB-SYNTH-04A] Biopolymer Lattice Weave', details: 'Precision: ±2µm' },
        { interface: 'Bio-integration Module', activeProtocol: '[BIO-MEND-02C] Self-Healing Pathway Activation & Monitoring', details: '' },
        { interface: 'AGI Core', activeProtocol: '[ENV-ADAPT-05B] Real-time Morpho-Adaptive Structure Reshaping', details: '' }
    ],
    perceptionFeeds: [
        { destination: 'Neuromorphic Learning Subsystem', status: 'STREAMING', dataIntegrity: 99.9 },
        { destination: 'AGI Situational Awareness Core', status: 'STREAMING', dataIntegrity: 99.9 }
    ],
    safetySystems: [
        { name: 'Collision Avoidance System', status: 'NOMINAL', details: 'Multi-layered perception, predictive trajectory analysis, and dynamic path re-planning. No immediate threats detected.' },
        { name: 'Emergency Stop Protocols', status: 'ARMED', details: 'Redundant hardware (physical E-Stop, dead man\'s switch) and software triggers (safe-state algorithms, power cut-off).' },
        { name: 'AGI Ethics & Safety Modulator', status: 'COMPLIANT', details: 'Continuous monitoring of all robotic operations against predefined ethical guidelines, safety thresholds, and regulatory compliance. All operations within defined envelopes.' }
    ]
};

const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;
const distance3D = (p1: Coordinates3D, p2: Coordinates3D) => Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2) + Math.pow(p1.z - p2.z, 2));
const distance2D = (p1: Coordinates2D, p2: Coordinates2D) => Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));


interface Eta7DashboardProps {
    agent: Agent;
    onReturn: () => void;
}

const Eta7Dashboard: React.FC<Eta7DashboardProps> = ({ agent, onReturn }) => {
    const [operationalState, setOperationalState] = useState<RoboticsOperationalState>(initialRoboticsState);
    const [fabricationTask, setFabricationTask] = useState<DelegatedTaskResult<SimulationResult>>({ sourceLab: 'Nanomaterials', status: 'PENDING', data: null });
    const [bioTask, setBioTask] = useState<DelegatedTaskResult<BioAssayResult>>({ sourceLab: 'Bio-Integration', status: 'PENDING', data: null });
    const [isFabricationLoading, setIsFabricationLoading] = useState(false);
    const [isBioLoading, setIsBioLoading] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setOperationalState(prev => {
                const newState = { ...prev };
                // Update general stats
                newState.sensorFusion.latency = 1.5 + Math.random() * 0.6;
                newState.controlLoopFrequency = 1.15 + Math.random() * 0.1;

                // Update manipulator positions
                newState.manipulators = prev.manipulators.map(m => {
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
                            forceFeedback: {
                                x: (Math.random() - 0.5) * 2,
                                y: (Math.random() - 0.5) * 2,
                                z: 5 + (Math.random() - 0.5) * 2,
                            }
                        };
                    }
                    return { ...m, status: 'ACTIVE', forceFeedback: { x: 0, y: 0, z: 0 } };
                });

                // Update mobile platform positions
                newState.mobilePlatforms = prev.mobilePlatforms.map(p => {
                    if (p.currentWaypoint) {
                        const dist = distance2D(p.position, p.currentWaypoint);
                        if (dist > 0.1) {
                            const angle = Math.atan2(p.currentWaypoint.y - p.position.y, p.currentWaypoint.x - p.position.x);
                            const speed = 1.5; // m/s
                            return {
                                ...p,
                                status: 'MOVING',
                                velocity: speed,
                                heading: angle * (180 / Math.PI),
                                position: {
                                    x: p.position.x + Math.cos(angle) * speed * 0.1,
                                    y: p.position.y + Math.sin(angle) * speed * 0.1,
                                }
                            };
                        } else {
                            // Arrived
                            return { ...p, status: 'ACTIVE', velocity: 0, currentWaypoint: null };
                        }
                    }
                    return p;
                });

                return newState;
            });
        }, 100); // Faster update for smoother animation
        return () => clearInterval(interval);
    }, []);

    const handleSetManipulatorTarget = (manipulatorName: string, target: Coordinates3D) => {
        setOperationalState(prev => ({
            ...prev,
            manipulators: prev.manipulators.map(m => m.name === manipulatorName ? { ...m, targetPosition: target } : m)
        }));
    };
    
    const handleSetGripperState = (manipulatorName: string, gripperStatus: 'Open' | 'Closed') => {
        setOperationalState(prev => ({
            ...prev,
            manipulators: prev.manipulators.map(m => m.name === manipulatorName ? { ...m, gripperStatus } : m)
        }));
    };
    
    const handleSetUgvWaypoint = (platformName: string, waypoint: Coordinates2D) => {
        setOperationalState(prev => ({
            ...prev,
            mobilePlatforms: prev.mobilePlatforms.map(p => p.name === platformName ? { ...p, currentWaypoint: waypoint } : p)
        }));
    };

    const handleDispatchFabrication = async (prompt: string) => {
        setIsFabricationLoading(true);
        setFabricationTask({ sourceLab: 'Nanomaterials', status: 'PENDING', data: null });
        try {
            const result = await executeFabricationTask(prompt);
            setFabricationTask({ sourceLab: 'Nanomaterials', status: 'COMPLETED', data: result });
        } catch (error) {
            console.error(error);
            setFabricationTask({ sourceLab: 'Nanomaterials', status: 'FAILED', data: null, error: 'Fabrication simulation failed.' });
        } finally {
            setIsFabricationLoading(false);
        }
    };

    const handleDispatchBioProtocol = async (prompt: string) => {
        setIsBioLoading(true);
        setBioTask({ sourceLab: 'Bio-Integration', status: 'PENDING', data: null });
        try {
            const result = await executeBioProtocolTask(prompt);
            setBioTask({ sourceLab: 'Bio-Integration', status: 'COMPLETED', data: result });
        } catch (error) {
            console.error(error);
            setBioTask({ sourceLab: 'Bio-Integration', status: 'FAILED', data: null, error: 'Bio-assay protocol failed.' });
        } finally {
            setIsBioLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3>Advanced Robotics Engineer Dashboard: {agent.name}</h3>
                <button onClick={onReturn}>Return to Comms</button>
            </div>

            <div className="eta-operational-dashboard">
                <div className="eta-title-bar module-panel">
                    <h3 className="!m-0 !p-0 !border-0">System Status: <span className="text-green-400">NOMINAL</span></h3>
                    <p className="m-0 text-gray-300">Current Task Focus: {agent.task}</p>
                </div>

                <div className="eta-infra-panel module-panel overflow-y-auto">
                    <h3>I. Core Robotic Setup &amp; Infrastructure</h3>
                    <CoreInfrastructurePanel 
                        state={operationalState}
                        onSetManipulatorTarget={handleSetManipulatorTarget}
                        onSetGripperState={handleSetGripperState}
                        onSetUgvWaypoint={handleSetUgvWaypoint}
                    />
                </div>

                <div className="eta-integration-panel module-panel overflow-y-auto">
                    <h3>II. Inter-Module Integration &amp; Execution Protocols</h3>
                    <IntegrationProtocolsPanel
                        state={operationalState}
                        onDispatchFabrication={handleDispatchFabrication}
                        isFabricationLoading={isFabricationLoading}
                        fabricationResult={fabricationTask}
                        onDispatchBio={handleDispatchBioProtocol}
                        isBioLoading={isBioLoading}
                        bioResult={bioTask}
                    />
                </div>
            </div>
        </div>
    );
};

export default Eta7Dashboard;