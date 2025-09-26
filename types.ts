// Fix: Defined all TypeScript types and interfaces used throughout the application.
export interface Agent {
    id: string;
    name: string;
    role: string;
    status: 'NOMINAL' | 'ACTIVE' | 'OFFLINE' | string;
    task: string;
    performance: number;
    avatar: string;
}

export interface ChatMessage {
    sender: 'user' | string; // user or agentId/orchestrator
    text: string;
    timestamp: string;
}

export type AgentChats = Record<string, ChatMessage[]>;

// Fix: Added SystemStatus type definition.
export interface SystemStatus {
    quantumCoreTemp: number;
    neuromorphicProcessorLoad: number;
    cognitiveSynthesizerEfficiency: number;
    systemIntegrity: number;
    powerLevels: {
        main: number;
        auxiliary: number;
    };
}

// Fix: Added Mission and related types.
export interface MissionTask {
    id: string;
    description: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
    assignedAgentId: string | null;
    result: string | null;
}

export interface Mission {
    id: string;
    objective: string;
    status: 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
    tasks: MissionTask[];
}

// Fix: Added FinalReportData type.
export interface FinalReportData {
    summary: string;
    outcomes: string[];
    recommendations: string[];
}

// Fix: Added types for the MARL disaster simulation.
export type CellType = 'EMPTY' | 'RUBBLE' | 'FIRE';

export interface GridCellState {
    type: CellType;
    intensity: number; // For fire
}

export type MarlAgentType = 'FIRE_FIGHTER' | 'MEDIC' | 'ENGINEER';
export interface MarlAgent {
    id: string;
    type: MarlAgentType;
    x: number;
    y: number;
    health: number;
    resources: number; // e.g., water, medical supplies
    carryingCivilianId: string | null;
}

export type CivilianStatus = 'TRAPPED' | 'RESCUED' | 'LOST';
export interface Civilian {
    id: string;
    x: number;
    y: number;
    health: number;
    status: CivilianStatus;
}

// Fix: Added types for Logistics specialized view.
export interface ManifestItem {
    item: string;
    quantity: number;
}
export interface Shipment {
    id: string;
    origin: string;
    destination: string;
    status: 'ON_TIME' | 'DELAYED' | 'DELIVERED';
    currentLocation: { lat: number; lon: number; };
    eta: string;
    manifest: ManifestItem[];
}
export interface InventoryItem {
    sku: string;
    name: string;
    quantity: number;
    reorderPoint: number;
}
export interface Warehouse {
    id: string;
    location: string;
    capacity: number;
    inventory: InventoryItem[];
}
export interface LogisticsAlert {
    id: string;
    type: 'LOW_STOCK' | 'DELAY' | 'WEATHER';
    message: string;
    timestamp: string;
}

// Fix: Added type for Quantum Research specialized view.
export interface QuantumExperimentResult {
    algorithmName: string;
    description: string;
    circuitVisualization: string;
    simulatedResult: string;
}

// Fix: Added type for Nanomaterials specialized view.
export interface ProvenanceLog {
    timestamp: string;
    message: string;
}
export interface SimulationResult {
    materialName: string;
    predictedProperties: {
        stability: string;
        conductivity: string;
        tensileStrength: string;
    };
    synthesisNotes: string;
    applications: string[];
    fabricationInstructions: string;
}

// Fix: Added types for Bio-Integration specialized view.
export interface OmicsData {
    id: string;
    type: 'Genomics' | 'Proteomics' | 'Metabolomics';
    dataset: string;
    status: 'Pending' | 'Analyzing' | 'Processed';
}
export interface LabAutomationRun {
    id: string;
    protocol: string;
    status: 'Running' | 'Completed' | 'Failed';
    startTime: string;
    endTime?: string;
}
export interface ProtocolStep {
    step: number;
    action: string;
    duration: string;
    reagents: string[];
}
export interface BioAssayResult {
    biocompatibility: {
        assessment: string;
        notes: string;
    };
    computationalAnalysis: string;
    biologicalProtocol: ProtocolStep[];
}
export interface ProteinFoldingResult {
    targetProtein: string;
    predictedStructure: string;
    bindingAffinity: string;
    therapeuticPotential: string;
}

// Fix: Added types for ATOI specialized view.
export interface WeaponSystem {
    name: string;
    status: 'Ready' | 'Depleted' | 'Damaged';
}
export interface AtoiUnit {
    id: string;
    type: 'Drone' | 'Ground Unit';
    position: { lat: number; lng: number };
    status: 'Idle' | 'Engaged' | 'Returning' | 'Damaged';
    weaponSystems: WeaponSystem[];
}
export interface AtoiMission {
    id: string;
    objective: string;
    status: 'Pending' | 'Active' | 'Completed' | 'Failed';
    priority: 'Low' | 'Medium' | 'High';
    assignedUnits: string[];
}
export interface AtoiTelemetry {
    activeUnits: number;
    threatLevel: 'Low' | 'Medium' | 'High' | 'Critical';
    commsStatus: 'Secure' | 'Interference' | 'Offline';
}

// Fix: Added types for Decentralized Systems specialized view.
export interface SmartContract {
    id: string;
    name: string;
    version: string;
    status: 'Active' | 'Deprecated' | 'Compromised';
    address: string;
}
export type DltTransactionType = 'Resource Allocation' | 'Ethical Compliance' | 'Data Provenance';
export interface DltTransaction {
    id: string;
    timestamp: string;
    type: DltTransactionType;
    details: string;
}

// Fix: Added types for Robotics Engineer specialized view.
export type Status = 'ACTIVE' | 'STANDBY' | 'ONLINE' | 'STREAMING' | 'NOMINAL' | 'ARMED' | 'COMPLIANT' | 'MOVING' | string;
export interface DelegatedTaskResult<T> {
    sourceLab: string;
    status: 'PENDING' | 'COMPLETED' | 'FAILED';
    data: T | null;
    error?: string;
}
export interface SimulationEnvironment {
    name: string;
    status: Status;
    fidelity: number;
    coverage: number;
    validation: number;
}
export interface Sensor {
    type: string;
    model: string;
    description: string;
}
export interface Coordinates3D { x: number; y: number; z: number; }
export interface Coordinates2D { x: number; y: number; }

export interface Manipulator {
    name: string;
    dof: number;
    status: Status;
    task: string;
    position: Coordinates3D;
    targetPosition: Coordinates3D;
    gripperStatus: 'Open' | 'Closed';
    forceFeedback: Coordinates3D;
}
export interface MobilePlatform {
    name: string;
    status: Status;
    task: string;
    position: Coordinates2D;
    velocity: number; // m/s
    heading: number; // degrees
    currentWaypoint: Coordinates2D | null;
}
export interface ExecutionProtocol {
    interface: string;
    activeProtocol: string;
    details: string;
}
export interface PerceptionFeed {
    destination: string;
    status: Status;
    dataIntegrity: number;
}
export interface SafetySystem {
    name: string;
    status: Status;
    details: string;
}
export interface RoboticsOperationalState {
    ros: { status: Status; version: string; };
    simulations: SimulationEnvironment[];
    sensorFusion: {
        status: Status;
        compute: string;
        sensors: Sensor[];
        latency: number;
    };
    manipulators: Manipulator[];
    mobilePlatforms: MobilePlatform[];
    controlLoopFrequency: number;
    executionProtocols: ExecutionProtocol[];
    perceptionFeeds: PerceptionFeed[];
    safetySystems: SafetySystem[];
}


// Fix: Added types for Neuromorphic specialized view.
export interface NeuromorphicChip {
    id: string;
    status: 'Online' | 'Offline' | 'Error';
    temperature: number;
    synapticConnections: number;
}
export interface SnnModel {
    id: string;
    name: string;
    neuronCount: number;
    synapseCount: number;
    status: 'Deployed' | 'Training' | 'Idle';
}


// =======================================================================
// ADVANCED ROBOTICS & AUTONOMOUS SYSTEMS (ARAS) LAB TYPES
// =======================================================================

// --- Top Level State ---
export interface ArasLabState {
    controlRoom: ControlRoomState;
    mainBay: MainBayState;
    robotics: RoboticsOperationalState;
    fabrication: FabricationState;
    hriLab: HriLabState;
    electronicsLab: ElectronicsLabState;
    logistics: LogisticsState;
}

// --- I. Control Room & Data Center ---
export interface HpcServer {
    id: string;
    type: 'GPU' | 'CPU';
    load: number; // percentage
    temp: number; // celsius
    status: 'Online' | 'Offline' | 'Error';
}

export interface AiTrainingJob {
    job: string;
    progress: number; // percentage
    eta: string;
}

export interface HpcClusterState {
    servers: HpcServer[];
    aiTraining: AiTrainingJob;
}

export interface DataStorageState {
    total: number; // petabytes
    used: number; // petabytes
    readSpeed: number; // GB/s
    writeSpeed: number; // GB/s
}

export interface NetworkState {
    bandwidth: number; // Gbps
    latency: number; // ms
    status: 'Secure' | 'Interference' | 'Degraded';
}

export interface PowerState {
    upsStatus: 'Online' | 'On Battery' | 'Offline';
    load: number; // percentage
    backupTime: string; // minutes
}

export interface ControlRoomState {
    hpcCluster: HpcClusterState;
    dataStorage: DataStorageState;
    network: NetworkState;
    power: PowerState;
}

// --- II. Main Robotics Bay ---
export interface MainBayState {
    motionCapture: {
        status: 'Active' | 'Inactive' | 'Calibrating';
        accuracy: number;
    };
    gantryCrane: {
        status: 'Idle' | 'Moving' | 'In Use';
        position: { x: number, y: number, z: number };
    };
    environment: {
        lighting: number; // percentage
        floor: 'Flat' | 'Uneven' | 'Obstacle Course';
        temperature: number; // celsius
    };
    operationsLog: string[];
}

// --- III. Fabrication & Prototyping Workshop ---
export interface FabricationMachine {
    id: string;
    status: 'Idle' | 'Printing' | 'Cutting' | 'Milling' | 'Maintenance' | 'Error';
    job: string;
    progress?: number;
}

export interface Printer extends FabricationMachine {
    type: 'FDM' | 'SLA' | 'SLS';
}

export interface Material {
    id: string;
    name: string;
    stock: number; // percentage or kg
}

export interface FabricationState {
    printers: Printer[];
    cnc: FabricationMachine;
    laserCutter: FabricationMachine;
    safety: {
        ventilation: 'Active' | 'Inactive';
        fireSuppression: 'Nominal' | 'Discharged';
    };
    materials: Material[];
}

// --- IV. HRI Lab ---
export interface HriLabState {
    ambience: {
        noiseLevel: number; // dB
        lighting: 'Soft White' | 'Daylight' | 'Custom';
    };
    biometrics: {
        status: 'Active' | 'Standby';
    };
    session: {
        status: 'Active' | 'Inactive';
        participants: number;
    };
}

// --- V. Electronics Lab ---
export interface TestEquipment {
    id: string;
    name: string;
    status: 'Available' | 'In Use' | 'Needs Calibration';
}

export interface ElectronicsLabState {
    esdProtection: 'Active' | 'Inactive';
    equipment: TestEquipment[];
    cleanRoom: {
        status: 'Nominal' | 'Contaminated';
        particulates: number; // ppm
    };
}

// --- VI. Logistics Zone ---
export interface LogisticsState {
    asrs: { // Automated Storage & Retrieval System
        status: 'Active' | 'Idle' | 'Error';
        lastMovement: string;
    };
    shipments: {
        incoming: number;
        outgoing: number;
    };
    secureStorage: {
        occupancy: number; // percentage
    };
}