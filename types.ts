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

export type View = 'mission' | 'explorer' | 'orchestrator' | 'system' | 'knowledge';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
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

export interface DGMOptimization {
  analysis: string;
  proposedModification: string;
  rationale: string;
  projectedImpact: string;
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
- Orchestrator AI: The central nervous system, responsible for strategic planning, resource allocation, and dynamic task management.
- Specialized Agents: Three core agents (Scientific Discovery, Societal Modeling, Planetary Exploration) execute tasks within their domain, leveraging both quantum and classical resources.
- Darwin-Gödel Machine (DGM): A self-optimization module that analyzes and rewrites its own code to improve performance based on mission outcomes.
- Ethical Governance Framework (EGF): A set of immutable core principles that ensure the system's operations remain aligned with predefined safety and ethical constraints.

2. System Architecture
The Nexus architecture is tripartite, consisting of the Quantum Core, the Classical Substrate, and the Orchestration Layer.

Quantum Core:
Provides computational advantages for specific problem classes, including complex simulation, optimization, and pattern recognition. Key metrics include Qubit Entanglement (QE), State Coherence, and Quantum Floating-Point Operations Per Second (QFLOPS).

Classical Substrate:
Handles traditional data processing, agent logic execution, and communication. It provides the stable computational bedrock upon which quantum processes are built. Monitored resources include CPU Utilization, Memory Allocation, and Network I/O.

Orchestration Layer:
The integrative brain of the system. The Orchestrator AI dynamically allocates tasks to agents, manages the hybrid computational resources, and ensures mission objectives are met efficiently and ethically. It maintains an active log of all major decisions.

3. Agent Cognitive Functions
Each agent possesses a unique set of cognitive functions tailored to its domain. These can be probed directly via the Cognitive Core Explorer.

Induction: The ability to generalize from specific observations to broader theories or hypotheses.
Reasoning: The logical process of deducing conclusions from known facts and premises.
Recursion: The capacity for self-referential analysis, allowing for deep, nested problem-solving.

4. Ethical Governance Framework (EGF)
The EGF is the system's conscience, ensuring all actions adhere to fundamental principles. It operates as the highest-level interrupt, capable of halting any process that violates its core directives.

Principle of Beneficence: The QAI must act in ways that benefit humanity and do no harm.
Principle of Transparency: The QAI's decision-making processes must be auditable and understandable to human overseers.
Principle of Accountability: The QAI is responsible for its actions and their consequences.

Any deviation from these principles triggers an alignment warning and may result in mission termination.
`;

export type { Chat };
