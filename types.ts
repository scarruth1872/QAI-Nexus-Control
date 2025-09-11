import { Chat } from '@google/genai';

export enum AgentType {
  SCIENTIFIC_DISCOVERY = 'Scientific Discovery',
  SOCIETAL_MODELING = 'Societal Modeling',
  PLANETARY_EXPLORATION = 'Planetary Exploration',
}

export enum ProbeType {
  INDUCTION = 'Induction',
  REASONING = 'Reasoning',
  RECURSION = 'Recursion',
}

export interface Agent {
  id: string;
  type: AgentType;
  status: 'idle' | 'active' | 'error';
  confidence: number;
}

export interface TacticalStep {
  id: number;
  description: string;
  agent: AgentType;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  result?: string;
  effort: number;
}

export interface TacticalPlan {
    phase: string;
    steps: TacticalStep[];
}

export interface Mission {
  objective: string;
  agents: Agent[];
  taskGraph: TacticalStep[];
  tacticalPlans: TacticalPlan[];
  status: 'planning' | 'executing' | 'completed' | 'failed';
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

// FIX: Added DGMOptimization interface to resolve type error in components/SystemOptimization.tsx
export interface DGMOptimization {
    analysis: string;
    proposedModification: string;
    rationale: string;
    projectedImpact: string;
}

export interface DraaUpgradeResult {
    analysis: string;
    upgradeDescription: string;
    newCapabilities: string[];
    efficiencyImpact: string;
}

export interface QuantumRefinementResult {
    algorithmImprovements: string[];
    hardwareEnhancements: string[];
    performanceGain: string;
}

export interface EthicalAnalysis {
    contextualAnalysis: string;
    proposedAction: string;
    ethicalJustification: string;
    conflictingPrinciples: string[];
}

export interface ResilienceAnalysis {
    predictedAnomalies: {
        component: string;
        probability: number;
        description: string;
        severity: 'Low' | 'Medium' | 'High';
    }[];
    systemHealthScore: number;
    recommendedActions: string[];
}

export interface StrategicAdvice {
    agentPerspectives: {
        agent: AgentType;
        analysis: string;
    }[];
    synthesizedRecommendation: string;
}

export interface SkfUpgradeResult {
    upgradeSummary: string;
    newCapabilities: string[];
    performanceImpact: string;
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
    domain: AgentType;
    scenario: string;
    simulationOutput: string;
    generatedParameters: { key: string; value: string }[];
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


export type LogEntryType = 'Quantum' | 'Classical' | 'Optimization' | 'System' | 'Error';

export interface OrchestrationLogEntry {
    timestamp: number;
    type: LogEntryType;
    decision: string;
}

export const KNOWLEDGE_CORE_DOCUMENT = `
1. Executive Summary
The Quantum Artificial Intelligence (QAI) Nexus is a state-of-the-art cognitive architecture designed to address complex, multi-domain problems. It integrates quantum-native processing with classical computational substrates, managed by a sophisticated Orchestrator AI. This document outlines the system's foundational principles, operational protocols, and ethical governance framework.

Core Components:
- Orchestrator AI: The central nervous system, responsible for strategic planning, resource allocation, and dynamic task management. It leverages a Meta-Orchestration Layer to dynamically self-optimize.
- Specialized Agents: Three core agents (Scientific Discovery, Societal Modeling, Planetary Exploration) execute tasks within their domain, leveraging both quantum and classical resources.
- Semantic Knowledge Fabric (SKF): An evolution of a traditional knowledge base, the SKF is a dynamic, self-organizing fabric capable of real-time ingestion from unstructured data and advanced cross-domain inference.
- Ethical Governance Framework (EGF): A set of immutable core principles that ensure the system's operations remain aligned with predefined safety and ethical constraints, augmented by the CEREA module.

2. System Architecture
The Nexus architecture is tripartite, consisting of the Quantum Core, the Classical Substrate, and the Orchestration Layer.

Quantum Core:
Provides computational advantages for specific problem classes. Its performance is continuously enhanced through hardware acceleration (improved qubit connectivity, error correction) and algorithmic refinements.

Classical Substrate:
Handles traditional data processing and agent logic. This is augmented by specialized Neuromorphic Co-Processors for highly parallel, energy-efficient tasks like sensory data fusion and anomaly detection.

Orchestration Layer:
The integrative brain of the system. The Orchestrator AI dynamically allocates tasks via an upgraded Dynamic Resource Allocation Agent (DRAA), which uses predictive modeling to anticipate computational demands.

3. Advanced System Modules & Capabilities

- Contextual Ethical Reasoning & Alignment Engine (CEREA): Integrated into the EGF, CEREA provides nuanced, context-aware analysis of complex ethical dilemmas, ensuring deeper value alignment. It is paired with an Explainable AI (XAI) module for decision transparency.

- Predictive Self-Healing & Adaptive Resilience Module (PSHARM): A proactive system that uses machine learning to anticipate potential failures, model cascading effects, and execute autonomous recovery protocols *before* critical degradation occurs.

- Multi-Modal Generative Simulation Engine: A powerful tool accessible via the Cognitive Explorer that allows agents to create and analyze highly realistic and complex "what-if" scenarios, from emergent societal behaviors to novel planetary ecosystems.

- Self-Evolving Algorithm Framework: A Phase 3 capability allowing the system to autonomously explore, optimize, and adapt its own internal algorithms and configurations using meta-learning and evolutionary computation.

- Quantum-Secure Communication: All internal and external communication channels are hardened with quantum-resistant cryptography protocols to fortify data security against future threats.

4. Ethical Governance Framework (EGF)
The EGF is the system's conscience, ensuring all actions adhere to fundamental principles. It operates as the highest-level interrupt, capable of halting any process that violates its core directives.

Principle of Beneficence: The QAI must act in ways that benefit humanity and do no harm.
Principle of Transparency: The QAI's decision-making processes must be auditable and understandable, a function enhanced by the XAI module.
Principle of Accountability: The QAI is responsible for its actions and their consequences.

5. Strategic Evolution & Recent Upgrades
The QAI Nexus system is designed for continuous evolution. The following strategic upgrades have been successfully integrated to enhance its core capabilities, efficiency, and resilience.

- Phase 1: Core System Optimization & Quantum Layer Enhancement (Completed): This phase focused on foundational performance. The Quantum Core received significant hardware and algorithmic refinements, increasing computational throughput. Concurrently, the Dynamic Resource Allocation Agent (DRAA) was upgraded with predictive modeling, enabling more efficient and proactive resource management across the entire system.

- Phase 2: Knowledge Synthesis & Agent Autonomy Expansion (Completed): This phase expanded the system's cognitive capabilities. The legacy knowledge base was evolved into the Semantic Knowledge Fabric (SKF) for superior data synthesis. A Multi-Modal Generative Simulation Engine was integrated, allowing agents to explore complex "what-if" scenarios. Finally, Proactive Alignment and Explainable AI (XAI) modules were implemented to ensure greater transparency and ethical robustness.

- Phase 3: Predictive Self-Improvement & Resilient Architecture (Completed): The final phase focused on achieving higher-order autonomy and security. A Self-Evolving Algorithm Framework was deployed, allowing the system to autonomously optimize its own logic. All communication channels were hardened with Quantum-Secure protocols to defend against future threats. Lastly, a Neuromorphic Co-Processor was integrated to accelerate highly parallel tasks, enhancing both performance and energy efficiency.
`;

export type { Chat };