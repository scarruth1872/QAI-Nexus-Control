// Fix: Added comprehensive type definitions for the entire application.

export type Status = 'IDLE' | 'ACTIVE' | 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'ERROR' | 'OFFLINE' | 'ONLINE' | 'DELAYED' | 'DELIVERED' | 'MAINTENANCE' | 'Patrolling' | 'Printing' | 'Running' | 'Failed' | 'Deployed' | 'Training' | 'Deprecated' | 'Processed' | 'Analyzing';

export interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: Status;
  performance: number;
  task: string | null;
  specializedDashboard?: string;
}

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

export interface Task {
  id: string;
  description: string;
  agentId: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  result?: string;
}

export interface Mission {
  objective: string;
  tasks: Task[];
  status: 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  report?: FinalReportData;
}

export interface FinalReportData {
  summary: string;
  outcomes: string[];
  recommendations: string[];
}

export interface ChatMessage {
  sender: 'user' | 'agent' | 'orchestrator';
  text: string;
  timestamp: string;
}

export type AgentChats = Record<string, ChatMessage[]>;

// MARL Types
export type CellType = 'EMPTY' | 'FIRE' | 'RUBBLE';

export interface GridCellState {
    type: CellType;
    intensity: number;
}

export type CivilianStatus = 'TRAPPED' | 'RESCUED' | 'LOST';

export interface Civilian {
    id: string;
    x: number;
    y: number;
    health: number;
    status: CivilianStatus;
}

export interface MarlAgent {
    id: string;
    type: 'FIRE_FIGHTER' | 'MEDIC' | 'ENGINEER';
    x: number;
    y: number;
    health: number;
    resources: number;
    carryingCivilianId: string | null;
}

// Logistics Types
export interface Coordinates2D {
    lat: number;
    lon: number;
}

export interface Shipment {
    id: string;
    origin: string;
    destination: string;
    status: Status;
    currentLocation: Coordinates2D;
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
    type: 'WEATHER_WARNING' | 'TRAFFIC_JAM' | 'MECHANICAL_FAILURE';
    message: string;
}

// Quantum Types
export interface QuantumExperimentResult {
    algorithmName: string;
    description: string;
    circuitVisualization: string;
    simulatedResult: string;
}

// Nanomaterials Types
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

// Bio-Integration Types
export interface OmicsData {
    id: string;
    type: 'Genomics' | 'Proteomics' | 'Metabolomics';
    dataset: string;
    status: Status;
}

export interface LabAutomationRun {
    id: string;
    protocol: string;
    status: 'Running' | 'COMPLETED' | 'Failed';
    startTime: string;
    endTime?: string;
}

export interface BioAssayResult {
    biocompatibility: {
        assessment: string;
        notes: string;
    };
    computationalAnalysis: string;
    biologicalProtocol: Array<{
        step: number;
        action: string;
        duration: string;
        reagents: string[];
    }>;
}

export interface ProteinFoldingResult {
    targetProtein: string;
    predictedStructure: string;
    bindingAffinity: string;
    therapeuticPotential: string;
}

// ATOI Types
export interface AtoiTelemetry {
    activeUnits: number;
    threatLevel: 'Low' | 'Medium' | 'High';
    commsStatus: 'Secure' | 'Compromised';
}

export interface AtoiMission {
    id: string;
    objective: string;
    priority: 'Low' | 'Medium' | 'High';
    status: 'PENDING' | 'ACTIVE' | 'COMPLETED';
}

export interface AtoiUnit {
    id: string;
    type: 'Ground Unit' | 'Drone';
    status: Status;
    position: { lat: number, lng: number };
}

// Decentralized Types
export interface SmartContract {
    id: string;
    name: string;
    version: string;
    status: 'Active' | 'Deprecated';
    address: string;
}

export interface DltTransaction {
    id: string;
    timestamp: string;
    type: 'Resource Allocation' | 'Ethical Compliance' | 'Data Provenance';
    details: string;
}

// Neuromorphic Types
export interface NeuromorphicChip {
    id: string;
    status: 'ONLINE' | 'OFFLINE';
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

// Live Comms
export interface LiveTranscriptionTurn {
    user: string;
    model: string;
}

// Robotics Bay / Lab state types
export interface Coordinates3D {
    x: number;
    y: number;
    z: number;
}

export interface Manipulator {
    name: string;
    joints: number[];
    endEffectorPosition: Coordinates3D;
    targetPosition?: Coordinates3D;
    gripperState: 'Open' | 'Closed';
    status: Status;
}

export interface UGV {
    name: string;
    position: Coordinates2D;
    waypoint?: Coordinates2D;
    battery: number;
    status: Status;
}

export interface Drone {
    name: string;
    position: Coordinates3D;
    battery: number;
    status: Status;
}

export interface RoboticsOperationalState {
    manipulators: Manipulator[];
    ugvs: UGV[];
    drones: Drone[];
}

// ARAS Lab State
export interface HpcClusterState {
    servers: { id: string; type: string; load: number; temp: number }[];
    aiTraining: { job: string; progress: number; eta: string };
}

export interface DataStorageState {
    total: number; // in PB
    used: number; // in PB
    readSpeed: number; // in GB/s
    writeSpeed: number; // in GB/s
}

export interface NetworkState {
    bandwidth: number; // in Gbps
    latency: number; // in ms
    status: 'Secure' | 'Unstable';
}

export interface PowerState {
    upsStatus: 'Online' | 'On Battery';
    load: number; // percentage
    backupTime: string;
}

export interface MainBayState {
    motionCapture: { status: Status; accuracy: number };
    gantryCrane: { status: Status; position: Coordinates3D };
    environment: { lighting: number; floor: 'Clear' | 'Obstructed'; temperature: number };
    operationsLog: string[];
}

export interface Printer {
    id: string;
    type: 'FDM' | 'SLA' | 'SLS';
    status: 'Printing' | 'Idle' | 'Error';
    job: string;
    progress?: number;
}

export interface FabricationMachine {
    id: string;
    status: Status;
    job: string;
}

export interface Material {
    id: string;
    name: string;
    stock: number; // percentage
}

export interface FabricationState {
    printers: Printer[];
    cnc: FabricationMachine;
    laserCutter: FabricationMachine;
    materials: Material[];
    safety: { ventilation: 'Active' | 'Inactive'; fireSuppression: 'Ready' | 'Discharged' };
}

export interface HriLabState {
    ambience: { noiseLevel: number; lighting: string };
    biometrics: { status: Status };
    session: { status: 'Active' | 'Inactive'; participants: number };
}

export interface Equipment {
    id: string;
    name: string;
    status: Status;
}

export interface ElectronicsLabState {
    esdProtection: 'Active' | 'Inactive';
    cleanRoom: { status: 'ISO 5' | 'ISO 7'; particulates: number };
    equipment: Equipment[];
}

export interface LogisticsState {
    asrs: { status: Status; lastMovement: string };
    shipments: { incoming: number; outgoing: number };
    secureStorage: { occupancy: number };
}

export interface ArasLabState {
    controlRoom: {
        hpcCluster: HpcClusterState;
        dataStorage: DataStorageState;
        network: NetworkState;
        power: PowerState;
    };
    mainBay: MainBayState;
    fabrication: FabricationState;
    hri: HriLabState;
    electronics: ElectronicsLabState;
    logistics: LogisticsState;
}