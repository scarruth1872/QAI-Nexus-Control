export enum AgentType {
  SCIENTIFIC_DISCOVERY = 'Scientific Discovery Agent',
  SOCIETAL_MODELING = 'Societal Modeling Agent',
  PLANETARY_EXPLORATION = 'Planetary Exploration Agent',
}

export type AgentStatus = 'idle' | 'active' | 'completed' | 'failed';
export type TacticalStepStatus = 'pending' | 'in_progress' | 'completed' | 'failed';

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
  status: TacticalStepStatus;
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
  status: 'ongoing' | 'completed' | 'failed';
  finalReport?: string;
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

export interface PredictedAnomaly {
    component: string;
    description: string;
    probability: number;
    severity: 'Low' | 'Medium' | 'High';
}

export interface ResilienceAnalysis {
    systemHealthScore: number;
    predictedAnomalies: PredictedAnomaly[];
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

export interface SkfUpgradeResult {
    upgradeSummary: string;
    newCapabilities: string[];
    performanceImpact: string;
}

export interface CognitiveSynthesisResult {
    confidenceScore: number;
    synthesizedKnowledge: string;
    keyConcepts: string[];
}

export interface GeneratedParameter {
    key: string;
    value: string;
}

export interface GenerativeSimulationResult {
    scenario: string;
    simulationOutput: string;
    generatedParameters: GeneratedParameter[];
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

export interface QaeAnalysisResult {
    anomalyId: string;
    severity: 'Low' | 'Medium' | 'High' | 'Critical';
    description: string;
    source: string;
    suggestedAction: string;
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
// FIX: Added missing types for System Optimization module
export interface ObjectiveWeights {
    speed: number;
    resilience: number;
    efficiency: number;
}

export interface ContextualWeightingResult {
    newWeights: ObjectiveWeights;
    analysis: string;
}

export interface AdaptiveOptimizationResult {
    proposal: string;
}
