
import React from 'react';

const Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.children}
  </svg>
);

export const NexusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 2.25 10.5 5.25 13.5 8.25m-3-3v10.5m4.5-4.5 3 3-3 3m-3-3h10.5M3.75 6.75h4.5v4.5h-4.5v-4.5Z" /></Icon>
);

export const ScienceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.215-.283.499-.51.845-.664a4.48 4.48 0 0 1 6.008 6.008 4.48 4.48 0 0 1-.664.845c-.283.215-.604.401-.959.401v0c-.31 0-.555.262-.555.585v1.5a.563.563 0 0 1-.563.563h-1.5a.563.563 0 0 1-.563-.563v-1.5c0-.323-.245-.585-.555-.585v0c-.355 0-.676-.186-.959-.401a4.48 4.48 0 0 1-6.008-6.008 4.48 4.48 0 0 1 .845-.664c.215-.283.401-.604.401-.959v0Zm-6.375 6.375a4.5 4.5 0 0 1 6.364 0" /></Icon>
);

export const SocietyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.289 2.72a3 3 0 0 1-4.682-2.72 9.094 9.094 0 0 1 3.741-.479m-4.258 3.203a9.094 9.094 0 0 0-3.742-.479 3 3 0 0 0 4.682 2.72M12 12.72a3 3 0 0 1 4.682 2.72 9.094 9.094 0 0 1-3.742.479m-4.258-3.203a9.094 9.094 0 0 1-3.742.479 3 3 0 0 1 4.682-2.72m0 0V9.72m0 0a2.25 2.25 0 0 1 2.25-2.25h.008a2.25 2.25 0 0 1 2.25 2.25v.008a2.25 2.25 0 0 1-2.25 2.25h-.008a2.25 2.25 0 0 1-2.25-2.25v-.008Z" /></Icon>
);

export const PlanetIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664l.143.258a1.125 1.125 0 0 1-1.708 1.144l-1.068-.89a2.25 2.25 0 0 0-1.897-.076l-.143.048a1.107 1.107 0 0 1-1.664.57l-.143-.258a1.125 1.125 0 0 0-1.144 1.708l.89 1.068c.214.257.53.405.864.405h.568c.334 0 .65.148.864.405l.89 1.068c.32.383.82.535 1.27.316l.766-.51a2.25 2.25 0 0 1 1.897.076l.89 1.068c.32.383.82.535 1.27.316l.766-.51a2.25 2.25 0 0 1 1.897.076l.89 1.068c.32.383.82.535 1.27.316l.766-.51a2.25 2.25 0 0 1 1.897.076l.143.107c.32.24.729.351 1.125.286l.568-.107a2.25 2.25 0 0 0 1.684-2.222l-.107-.568a2.25 2.25 0 0 1 2.222-1.684l.107.568c.065.396.046.8-.286 1.125l-.107.143a2.25 2.25 0 0 0-1.684 2.222l-.568.107c-.396.065-.8-.046-1.125-.286l-.107-.143a2.25 2.25 0 0 0-2.222-1.684l.107-.568a2.25 2.25 0 0 1 1.684-2.222l-.107-.568c-.065-.396.046-.8.286-1.125l.107-.143a2.25 2.25 0 0 0-2.222-1.684l-.568.107c-.396.065-.8.046-1.125-.286l-.107-.143a2.25 2.25 0 0 0-1.684-2.222z" /></Icon>
);

export const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.311a14.994 14.994 0 0 1-4.5 0M9.75 6.75h4.5M9.75 6.75a2.25 2.25 0 0 1-2.25-2.25v-.632c0-.65.527-1.182 1.176-1.182h.458c.649 0 1.176.532 1.176 1.182v.632A2.25 2.25 0 0 1 9.75 6.75z" /></Icon>
);

export const ScaleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.186.24c-1.908 0-3.806-.41-5.614-1.24L12 11.25m-3.75 9.75c-1.01.143-2.01.317-3 .52m3-.52l-2.62 10.726c-.122.499.106 1.028.589 1.202a5.989 5.989 0 0 0 2.186.24c1.908 0 3.806-.41 5.614-1.24L12 11.25" /></Icon>
);

export const RecursionIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.092 1.209-.138 2.43-.138 3.662v.114M19.5 12a9.75 9.75 0 1 1-19.5 0 9.75 9.75 0 0 1 19.5 0Z" /></Icon>
);

export const CpuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 21v-1.5M12 4.5V3m0 18v-1.5m3.75-16.5v1.5m0 16.5v-1.5M12 18.75a6.75 6.75 0 1 1 0-13.5 6.75 6.75 0 0 1 0 13.5Z" /></Icon>
);

export const QuantumCircuitIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5v2.25m0-2.25l2.25 1.313M16.5 20.25l-2.25-1.313m0 0-2.25 1.313m2.25-1.313v2.25m2.25-4.5-2.25 1.313m0 0-2.25-1.313m2.25 1.313v2.25m0-6.75-2.25-1.313m0 0-2.25 1.313m2.25-1.313v2.25m2.25-4.5-2.25 1.313m0 0-2.25-1.313m2.25 1.313v2.25M7.5 5.25l-2.25 1.313m0 0L7.5 8.25m-2.25-1.688v2.25m11.25-1.313-2.25 1.313m0 0-2.25-1.313m4.5 0v2.25" /></Icon>
);

export const BrainCircuitIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.898 20.562l.648 1.188-.648 1.188a2.25 2.25 0 0 1-1.47 1.47l-1.188.648 1.188.648a2.25 2.25 0 0 1 1.47 1.47l.648 1.188.648-1.188a2.25 2.25 0 0 1 1.47-1.47l1.188-.648-1.188-.648a2.25 2.25 0 0 1-1.47-1.47Z" /></Icon>
);

export const AlertIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></Icon>
);

export const OptimizationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m18 0h-1.5" /></Icon>
);

export const ShieldIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Z" /></Icon>
);

export const ShieldCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></Icon>
);

export const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></Icon>
);

export const CubeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25m-9-3.75v9l9 5.25m0-9v9" /></Icon>
);

export const LockClosedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 0 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></Icon>
);
