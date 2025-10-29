import React, { createContext, useState, useCallback, useEffect, useContext, ReactNode } from 'react';
import { Agent, SystemStatus, Mission, AgentChats, ChatMessage, FinalReportData, ArasLabState, RoboticsOperationalState, Coordinates3D, Coordinates2D } from '../types';
import { generateMissionPlan, generateMissionCompletionReport, getTacticalSuggestion } from '../services/geminiService';
import { getInitialAgents, getInitialSystemStatus, getInitialRoboticsState, getInitialArasLabState } from '../data/initialData';

interface AppContextState {
    agents: Agent[];
    systemStatus: SystemStatus;
    mission: Mission | null;
    isMissionLoading: boolean;
    agentChats: AgentChats;
    isReportModalOpen: boolean;
    arasLabState: ArasLabState;
    roboticsState: RoboticsOperationalState;
    handleInitiateMission: (objective: string) => void;
    handleSendMessage: (agentId: string, text: string) => void;
    handleSetManipulatorTarget: (name: string, target: Coordinates3D) => void;
    handleSetGripperState: (name: string, state: 'Open' | 'Closed') => void;
    handleSetUgvWaypoint: (name: string, waypoint: Coordinates2D) => void;
    handleGenerateLabReport: (topic: string, data: any) => Promise<void>;
    setIsReportModalOpen: (isOpen: boolean) => void;
}

const AppContext = createContext<AppContextState | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [agents, setAgents] = useState<Agent[]>(getInitialAgents());
    const [systemStatus, setSystemStatus] = useState<SystemStatus>(getInitialSystemStatus());
    const [mission, setMission] = useState<Mission | null>(null);
    const [isMissionLoading, setIsMissionLoading] = useState(false);
    const [agentChats, setAgentChats] = useState<AgentChats>({});
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [arasLabState, setArasLabState] = useState<ArasLabState>(getInitialArasLabState());
    const [roboticsState, setRoboticsState] = useState<RoboticsOperationalState>(getInitialRoboticsState());

    // Effect to simulate system status updates
    useEffect(() => {
        const interval = setInterval(() => {
            setSystemStatus(prev => ({
                ...prev,
                quantumCoreTemp: 0.015 + Math.random() * 0.005,
                neuromorphicProcessorLoad: 20 + Math.random() * 15,
                cognitiveSynthesizerEfficiency: 98.5 + Math.random(),
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    
    // Real-time robotics simulation
    useEffect(() => {
        const roboticsInterval = setInterval(() => {
            setRoboticsState(prevState => {
                const newState = JSON.parse(JSON.stringify(prevState));
                const speed = 0.1;

                newState.manipulators.forEach((m: any) => {
                    if (m.targetPosition) {
                        const dx = m.targetPosition.x - m.endEffectorPosition.x;
                        const dy = m.targetPosition.y - m.endEffectorPosition.y;
                        const dz = m.targetPosition.z - m.endEffectorPosition.z;
                        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
                        
                        if (dist < speed) {
                            m.endEffectorPosition = m.targetPosition;
                            delete m.targetPosition;
                            m.status = 'IDLE';
                        } else {
                            m.endEffectorPosition.x += (dx / dist) * speed;
                            m.endEffectorPosition.y += (dy / dist) * speed;
                            m.endEffectorPosition.z += (dz / dist) * speed;
                        }
                    }
                });

                newState.ugvs.forEach((ugv: any) => {
                    if (ugv.waypoint) {
                         const dx = ugv.waypoint.lon - ugv.position.lon;
                         const dy = ugv.waypoint.lat - ugv.position.lat;
                         const dist = Math.sqrt(dx*dx + dy*dy);
                         
                         if (dist < speed) {
                             ugv.position = ugv.waypoint;
                             delete ugv.waypoint;
                             ugv.status = 'IDLE';
                         } else {
                             ugv.position.lon += (dx / dist) * speed;
                             ugv.position.lat += (dy / dist) * speed;
                         }
                    }
                });


                return newState;
            });
        }, 100); // High frequency for smooth updates

        return () => clearInterval(roboticsInterval);
    }, []);


    const handleInitiateMission = useCallback(async (objective: string) => {
        setIsMissionLoading(true);
        setMission(null);
        try {
            const agentRoles = agents.map(a => `- ${a.id}: ${a.role}`).join('\n');
            const plan = await generateMissionPlan(objective, agentRoles);
            setMission({ ...plan, status: 'IN_PROGRESS' });
        } catch (error) {
            console.error("Failed to generate mission plan:", error);
        } finally {
            setIsMissionLoading(false);
        }
    }, [agents]);

    const handleSendMessage = useCallback(async (agentId: string, text: string) => {
        const userMessage: ChatMessage = { sender: 'user', text, timestamp: new Date().toISOString() };
        
        setAgentChats(prev => ({
            ...prev,
            [agentId]: [...(prev[agentId] || []), userMessage]
        }));

        try {
            const agent = agents.find(a => a.id === agentId);
            const prompt = `You are the AI agent "${agent?.name}", with the role of "${agent?.role}". A user has sent you the following message: "${text}". Provide a concise, in-character response.`;
            const responseText = await getTacticalSuggestion(prompt);
            const agentMessage: ChatMessage = { sender: 'agent', text: responseText, timestamp: new Date().toISOString() };
            
            setAgentChats(prev => ({
                ...prev,
                [agentId]: [...(prev[agentId] || []), agentMessage]
            }));

        } catch (error) {
            console.error("Failed to get agent response:", error);
             const errorMessage: ChatMessage = { sender: 'agent', text: "Error: Could not process response.", timestamp: new Date().toISOString() };
             setAgentChats(prev => ({
                ...prev,
                [agentId]: [...(prev[agentId] || []), errorMessage]
            }));
        }
    }, [agents]);
    
    // Mission simulation effect
    useEffect(() => {
        if (mission?.status === 'IN_PROGRESS') {
            const interval = setInterval(async () => {
                setMission(prevMission => {
                    if (!prevMission) return null;

                    const pendingTasks = prevMission.tasks.filter(t => t.status === 'PENDING');
                    if (pendingTasks.length > 0) {
                        const taskToStart = pendingTasks[0];
                        taskToStart.status = 'IN_PROGRESS';
                        
                        const newTasks = prevMission.tasks.map(t => t.id === taskToStart.id ? taskToStart : t);
                        return { ...prevMission, tasks: newTasks };
                    }

                    const inProgressTasks = prevMission.tasks.filter(t => t.status === 'IN_PROGRESS');
                    if (inProgressTasks.length > 0) {
                        const taskToComplete = inProgressTasks[0];
                        taskToComplete.status = 'COMPLETED';
                        taskToComplete.result = `Task "${taskToComplete.description}" completed successfully.`;
                         const newTasks = prevMission.tasks.map(t => t.id === taskToComplete.id ? taskToComplete : t);
                        return { ...prevMission, tasks: newTasks };
                    }
                    
                    if (prevMission.tasks.every(t => t.status === 'COMPLETED')) {
                        return { ...prevMission, status: 'COMPLETED' };
                    }

                    return prevMission;
                });
            }, 3000);

            return () => clearInterval(interval);
        } else if (mission?.status === 'COMPLETED' && !mission.report) {
            const generateReport = async () => {
                try {
                    const reportData = await generateMissionCompletionReport(mission.objective, mission.tasks);
                    setMission(prev => prev ? ({ ...prev, report: reportData }) : null);
                    setIsReportModalOpen(true);
                } catch (error) {
                    console.error("Failed to generate final report:", error);
                }
            };
            generateReport();
        }
    }, [mission]);

    // ARAS Lab State Handlers
    const handleSetManipulatorTarget = useCallback((name: string, target: Coordinates3D) => {
        setRoboticsState(prevState => ({
            ...prevState,
            manipulators: prevState.manipulators.map(m => m.name === name ? { ...m, targetPosition: target, status: 'ACTIVE' } : m)
        }));
    }, []);
    const handleSetGripperState = useCallback((name: string, state: 'Open' | 'Closed') => {
         setRoboticsState(prevState => ({
            ...prevState,
            manipulators: prevState.manipulators.map(m => m.name === name ? { ...m, gripperState: state } : m)
        }));
    }, []);
    const handleSetUgvWaypoint = useCallback((name: string, waypoint: Coordinates2D) => {
        setRoboticsState(prevState => ({
            ...prevState,
            ugvs: prevState.ugvs.map(ugv => ugv.name === name ? { ...ugv, waypoint: waypoint, status: 'ACTIVE' } : ugv)
        }));
    }, []);

    const handleGenerateLabReport = useCallback(async (topic: string, data: any) => {
        const prompt = `Generate a concise technical report on the status of "${topic}" given the following data: ${JSON.stringify(data)}`;
        const report = await getTacticalSuggestion(prompt);
        alert(`--- AI Generated Report: ${topic} ---\n\n${report}`);
    }, []);


    const value = {
        agents,
        systemStatus,
        mission,
        isMissionLoading,
        agentChats,
        isReportModalOpen,
        arasLabState,
        roboticsState,
        handleInitiateMission,
        handleSendMessage,
        handleSetManipulatorTarget,
        handleSetGripperState,
        handleSetUgvWaypoint,
        handleGenerateLabReport,
        setIsReportModalOpen,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppState = (): AppContextState => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppState must be used within an AppStateProvider');
    }
    return context;
};
