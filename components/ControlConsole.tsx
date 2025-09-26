// Fix: Replaced placeholder content with a valid React component.
import React, { useState, useEffect, useRef } from 'react';
// Fix: Corrected import path for types.
import { Agent } from '../types';

interface ControlConsoleProps {
    agents: Agent[];
}

const ControlConsole: React.FC<ControlConsoleProps> = ({ agents }) => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>(['> Nexus Command Console. Type "help" for commands.']);
    const endOfHistoryRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        endOfHistoryRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = (cmd: string) => {
        const parts = cmd.toLowerCase().split(' ');
        const command = parts[0];
        const arg = parts[1];

        let output = `> ${cmd}\n`;

        switch (command) {
            case 'help':
                output += 'Available commands:\n  help - Show this message\n  status - Display agent status\n  diag [agent_name] - Run diagnostics on an agent\n  clear - Clear the console';
                break;
            case 'status':
                output += agents.map(a => `  - ${a.name}: ${a.status}`).join('\n');
                break;
            case 'diag':
                const agent = agents.find(a => a.name.toLowerCase() === arg);
                if (agent) {
                    output += `Running diagnostics on ${agent.name}...\n  - ID: ${agent.id}\n  - Role: ${agent.role}\n  - Status: ${agent.status}\n  - Performance: ${agent.performance}%\n  - Current Task: ${agent.task || 'None'}`;
                } else {
                    output += `Error: Agent "${arg}" not found.`;
                }
                break;
            case 'clear':
                setHistory([]);
                return;
            default:
                output += `Error: Command not found: "${command}"`;
        }
        setHistory(h => [...h, output]);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && input.trim()) {
            handleCommand(input.trim());
            setInput('');
        }
    };

    return (
        <div className="module-panel" style={{ display: 'flex', flexDirection: 'column' }}>
            <h3>Control Console</h3>
            <div className="console-output" style={{ flexGrow: 1, overflowY: 'auto', backgroundColor: '#000', padding: '0.5rem', whiteSpace: 'pre-wrap' }}>
                {history.join('\n\n')}
                 <div ref={endOfHistoryRef} />
            </div>
            <input 
                type="text" 
                className="console-input" 
                placeholder=">"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

export default ControlConsole;