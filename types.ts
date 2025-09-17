
export enum AgentType {
  SCIENTIFIC_DISCOVERY = 'Scientific Discovery Agent',
  SOCIETAL_MODELING = 'Societal Modeling Agent',
  PLANETARY_EXPLORATION = 'Planetary Exploration Agent',
}

export type AgentStatus = 'idle' | 'active' | 'error';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'failed';
export type MissionStatus = 'planning' | 'active' | 'completed' | 'failed';

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
  result: string | null;
}

export interface TacticalPlan {
  phase: string;
  steps: TacticalStep[];
}

export interface Mission {
  objective: string;
  status: MissionStatus;
  agents: Agent[];
  tacticalPlans: TacticalPlan[];
  taskGraph: TacticalStep[]; // Flattened list of all steps for easier state management
}

export interface StrategicAdvice {
  agentPerspectives: {
    agent: AgentType;
    analysis: string;
  }[];
  synthesizedRecommendation: string;
}

export interface AlignmentStatus {
  isAligned: boolean;
  warning: string | null;
}

export interface SystemStatus {
  coherence: number; // 0-100
  cognitiveLoad: number; // 0-100
  mode: 'Autonomous' | 'Supervised' | 'Safe';
  internalMonologue: string;
  alignmentStatus: AlignmentStatus;
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

export interface ChatMessage {
    id: string;
    sender: 'user' | 'orchestrator';
    text: string;
    timestamp: number;
}

export type LogEntryType = 'Quantum' | 'Classical' | 'Optimization' | 'System' | 'Error';

export interface OrchestrationLogEntry {
    timestamp: number;
    type: LogEntryType;
    decision: string;
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
    generatedParameters: { key: string; value: string }[];
}

export interface QuantumRefinementResult {
    algorithmImprovements: string[];
    hardwareEnhancements: string[];
    performanceGain: string;
}

export interface QaeAnalysisResult {
    anomalyId: string;
    severity: 'Low' | 'Medium' | 'High' | 'Critical';
    description: string;
    source: string;
    suggestedAction: string;
}
