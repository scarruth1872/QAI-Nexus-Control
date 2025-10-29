import { Agent, SystemStatus, ArasLabState, RoboticsOperationalState } from '../types';

export const getInitialAgents = (): Agent[] => [
    { id: 'aras', name: 'ARAS', role: 'ARAS Facility Control', avatar: '/avatars/aras.png', status: 'ONLINE', performance: 100, task: 'Monitoring all lab systems.', specializedDashboard: 'ControlRoom' },
    { id: 'alpha-1', name: 'Alpha-1', role: 'ATOI Field Commander', avatar: '/avatars/alpha-1.png', status: 'ACTIVE', performance: 98, task: 'Executing patrol patterns.', specializedDashboard: 'ATOI' },
    { id: 'beta-2', name: 'Beta-2', role: 'Logistics Coordinator', avatar: '/avatars/beta-2.png', status: 'ACTIVE', performance: 95, task: 'Optimizing supply routes.', specializedDashboard: 'Logistics' },
    { id: 'gamma-3', name: 'Gamma-3', role: 'Nanomaterials Scientist', avatar: '/avatars/gamma-3.png', status: 'IDLE', performance: 99, task: 'Awaiting new simulation parameters.', specializedDashboard: 'Nanomaterials' },
    { id: 'delta-4', name: 'Delta-4', role: 'Bio-Integration Specialist', avatar: '/avatars/delta-4.png', status: 'IDLE', performance: 97, task: 'Analyzing genomic data.', specializedDashboard: 'Bio-Integration' },
    { id: 'epsilon-5', name: 'Epsilon-5', role: 'Quantum Researcher', avatar: '/avatars/epsilon-5.png', status: 'ACTIVE', performance: 100, task: 'Running quantum chemistry simulation.', specializedDashboard: 'Quantum' },
    { id: 'zeta-6', name: 'Zeta-6', role: 'Decentralized Systems Analyst', avatar: '/avatars/zeta-6.png', status: 'ACTIVE', performance: 99, task: 'Monitoring DLT network health.', specializedDashboard: 'Decentralized' },
    { id: 'eta-7', name: 'Eta-7', role: 'Robotics & Automation Specialist', avatar: '/avatars/eta-7.png', status: 'IDLE', performance: 96, task: 'Calibrating manipulator arm.', specializedDashboard: 'Robotics' },
    { id: 'theta-8', name: 'Theta-8', role: 'Neuromorphic Architect', avatar: '/avatars/theta-8.png', status: 'ACTIVE', performance: 100, task: 'Processing live sensor data.', specializedDashboard: 'Neuromorphic' },
];

export const getInitialSystemStatus = (): SystemStatus => ({
    quantumCoreTemp: 0.015,
    neuromorphicProcessorLoad: 25.5,
    cognitiveSynthesizerEfficiency: 98.9,
    systemIntegrity: 100,
    powerLevels: { main: 100, auxiliary: 100 },
});


export const getInitialRoboticsState = (): RoboticsOperationalState => ({
    manipulators: [
        { name: 'Manipulator-1A', joints: [0, 0, 0, 0, 0, 0], endEffectorPosition: { x: 0, y: 1, z: 2 }, gripperState: 'Open', status: 'IDLE' },
        { name: 'Manipulator-1B', joints: [0, 0, 0, 0, 0, 0], endEffectorPosition: { x: 5, y: 1, z: 2 }, gripperState: 'Closed', status: 'IDLE' },
    ],
    ugvs: [
        { name: 'UGV-01', position: { lat: 0, lon: 0 }, battery: 95, status: 'IDLE' },
        { name: 'UGV-02', position: { lat: 5, lon: 5 }, battery: 80, status: 'MAINTENANCE' },
    ],
    drones: [
        { name: 'Drone-01', position: { x: 0, y: 0, z: 10 }, battery: 88, status: 'ACTIVE' },
    ]
});

export const getInitialArasLabState = (): ArasLabState => ({
    controlRoom: {
        hpcCluster: {
            servers: [
                { id: 'GPU-Node-01', type: 'GPU', load: 75, temp: 65 },
                { id: 'CPU-Node-01', type: 'CPU', load: 40, temp: 50 }
            ],
            aiTraining: { job: 'MARL Sim', progress: 67, eta: '42 mins' }
        },
        dataStorage: { total: 10, used: 7.5, readSpeed: 5.2, writeSpeed: 2.8 },
        network: { bandwidth: 100, latency: 2.1, status: 'Secure' },
        power: { upsStatus: 'Online', load: 88, backupTime: '2 hours' }
    },
    mainBay: {
        motionCapture: { status: 'ONLINE', accuracy: 0.998 },
        gantryCrane: { status: 'IDLE', position: { x: 10, y: 5, z: 8 } },
        environment: { lighting: 80, floor: 'Clear', temperature: 21 },
        operationsLog: ['[12:00] System startup complete.', '[12:01] UGV-01 returned to charging dock.']
    },
    fabrication: {
        printers: [
            // Fix: Changed status to 'Idle' to match the Printer type definition.
            { id: 'FDM-01', type: 'FDM', status: 'Idle', job: 'None' },
            { id: 'SLA-01', type: 'SLA', status: 'Printing', job: 'Drone Chassis Bracket', progress: 78 }
        ],
        cnc: { id: 'CNC-01', status: 'IDLE', job: 'None' },
        laserCutter: { id: 'LC-01', status: 'IDLE', job: 'None' },
        materials: [
            { id: 'PLA-BLK', name: 'PLA Filament', stock: 80 },
            { id: 'RESIN-GRY', name: 'UV Resin', stock: 65 }
        ],
        safety: { ventilation: 'Active', fireSuppression: 'Ready' }
    },
    hri: {
        ambience: { noiseLevel: 30, lighting: 'Normal' },
        biometrics: { status: 'OFFLINE' },
        session: { status: 'Inactive', participants: 0 }
    },
    electronics: {
        esdProtection: 'Active',
        cleanRoom: { status: 'ISO 5', particulates: 120 },
        equipment: [
            { id: 'OSC-01', name: 'Oscilloscope', status: 'ONLINE' },
            { id: 'PSU-01', name: 'Power Supply', status: 'ONLINE' }
        ]
    },
    logistics: {
        asrs: { status: 'ONLINE', lastMovement: 'Bin A-32 to Staging' },
        shipments: { incoming: 2, outgoing: 5 },
        secureStorage: { occupancy: 45 }
    }
});