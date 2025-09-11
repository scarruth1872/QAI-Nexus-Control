
export enum AgentType {
  SCIENTIFIC_DISCOVERY = 'Scientific Discovery',
  SOCIETAL_MODELING = 'Societal Modeling',
  PLANETARY_EXPLORATION = 'Planetary Exploration',
}

export enum ProbeType {
  INDUCTION = 'induction',
  REASONING = 'reasoning',
  RECURSION = 'recursion',
}

export interface Agent {
  id: string;
  type: AgentType;
  status: 'active' | 'inactive' | 'error';
  confidence: number;
}

export interface TacticalStep {
  id: string;
  description: string;
  agent: AgentType;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  result?: string;
}

export interface TacticalPlan {
  phase: string;
  steps: TacticalStep[];
}

export interface Mission {
  objective: string;
  agents: Agent[];
  tacticalPlans: TacticalPlan[];
  taskGraph: TacticalStep[];
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  finalReport?: string;
}

export type View = 'mission' | 'explorer' | 'orchestrator' | 'system' | 'knowledge' | 'roadmap';

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

export interface LoggedChatMessage extends ChatMessage {
    agentType: AgentType;
}

export enum LogEntryType {
    QUANTUM = 'Quantum',
    CLASSICAL = 'Classical',
    OPTIMIZATION = 'Optimization',
    SYSTEM = 'System',
    ERROR = 'Error',
}

export interface OrchestrationLogEntry {
    timestamp: number;
    type: LogEntryType;
    decision: string;
}

export interface SystemStatus {
    coherence: number;
    cognitiveLoad: number;
    mode: 'Standard' | 'High-Alert' | 'Self-Optimization' | 'Safe-Mode';
    internalMonologue: string;
    alignmentStatus: {
        isAligned: boolean;
        warning: string | null;
    };
}

export interface AgentPerspective {
    agent: AgentType;
    analysis: string;
}

export interface StrategicAdvice {
    agentPerspectives: AgentPerspective[];
    synthesizedRecommendation: string;
}

export interface SkfUpgradeResult {
    upgradeSummary: string;
    newCapabilities: string[];
    performanceImpact: string;
}

export interface DGMOptimization {
    analysis: string;
    proposedModification: string;
    rationale: string;
    projectedImpact: string;
}

export interface QuantumRefinementResult {
    algorithmImprovements: string[];
    hardwareEnhancements: string[];
    performanceGain: string;
}

export interface DraaUpgradeResult {
    analysis: string;
    upgradeDescription: string;
    newCapabilities: string[];
    efficiencyImpact: string;
}

export interface SelfEvolvingAlgorithmResult {
    framework: string;
    targetModule: string;
    optimizationMethod: string;
    discoveredImprovement: string;
    performanceMetric: string;
    projectedGain: string;
}

export interface QuantumSecurityUpgradeResult {
    upgradeSummary: string;
    protocolsImplemented: string[];
    threatVectorMitigated: string;
    systemImpact: string;
}

export interface NeuromorphicIntegrationResult {
    processorModel: string;
    integrationSummary: string;
    targetWorkloads: string[];
    performanceGains: string;
}

export interface ResilienceAnalysis {
    systemHealthScore: number;
    predictedAnomalies: {
        component: string;
        description: string;
        probability: number;
        severity: 'Low' | 'Medium' | 'High';
    }[];
    recommendedActions: string[];
}

export interface EthicalAnalysis {
    contextualAnalysis: string;
    proposedAction: string;
    ethicalJustification: string;
    conflictingPrinciples: string[];
}

export interface XaiAnalysisResult {
    decisionId: string;
    agent: AgentType;
    decision: string;
    simplifiedRationale: string;
    factorsConsidered: string[];
    ethicalPrinciplesVerified: string[];
}

export interface GenerativeSimulationResult {
    scenario: string;
    simulationOutput: string;
    generatedParameters: {
        key: string;
        value: string;
    }[];
}

export interface MarlTrainingResult {
    strategy: string;
    performanceGain: string;
}

export interface CognitiveSynthesisResult {
    synthesizedKnowledge: string;
    keyConcepts: string[];
    confidenceScore: number;
}
