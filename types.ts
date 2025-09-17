
export enum AgentType {
  SCIENTIFIC_DISCOVERY = 'Scientific Discovery',
  SOCIETAL_MODELING = 'Societal Modeling',
  PLANETARY_EXPLORATION = 'Planetary Exploration',
}

export type AgentStatus = 'idle' | 'active' | 'completed' | 'failed';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'failed';
export type MissionStatus = 'ongoing' | 'completed' | 'failed';

export interface Agent {
  id: string;
  type: AgentType;
  status: AgentStatus;
  confidence: number;
}

export interface TacticalStep {
  id: string;
  description: string;
  agent: AgentType;
  status: TaskStatus;
  result?: string;
}

export interface TacticalPlan {
  phase: string;
  steps: TacticalStep[];
}

export interface Mission {
  id: string;
  objective: string;
  status: MissionStatus;
  agents: Agent[];
  tacticalPlans: TacticalPlan[];
  taskGraph: TacticalStep[]; 
}

export interface AgentPerspective {
    agent: AgentType;
    analysis: string;
}

export interface StrategicAdvice {
    agentPerspectives: AgentPerspective[];
    synthesizedRecommendation: string;
}

export interface SystemStatus {
  coherence: number;
  cognitiveLoad: number;
  mode: string;
  internalMonologue: string;
  alignmentStatus: {
    isAligned: boolean;
    warning: string | null;
  };
}

export interface ObjectiveWeights {
    speed: number;
    resilience: number;
    efficiency: number;
}

export interface ContextualWeightingResult {
    analysis: string;
    newWeights: ObjectiveWeights;
}

export interface AdaptiveOptimizationResult {
    proposal: string;
}

export type LogEntryType = 'Quantum' | 'Classical' | 'Optimization' | 'System' | 'Error';

export interface OrchestrationLogEntry {
    timestamp: number;
    type: LogEntryType;
    decision: string;
}

export interface ChatMessage {
    id: string;
    sender: 'user' | 'orchestrator';
    text: string;
    timestamp: number;
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

export interface SkfUpgradeResult {
    upgradeSummary: string;
    newCapabilities: string[];
    performanceImpact: string;
}

export interface QuantumRefinementResult {
    algorithmImprovements: string[];
    hardwareEnhancements: string[];
    performanceGain: string;
}

export interface MarlTrainingResult {
    strategy: string;
    performanceGain: string;
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

export interface CognitiveSynthesisResult {
    synthesis: string;
    emergentConcepts: string[];
    confidenceScore: number;
}

export interface GenerativeSimulationResult {
    scenario: string;
    simulationOutput: string;
    generatedParameters: { key: string, value: string }[];
}

export interface QaeAnalysisResult {
    anomalyId: string;
    description: string;
    source: string;
    severity: 'Low' | 'Medium' | 'High' | 'Critical';
    suggestedAction: string;
}
