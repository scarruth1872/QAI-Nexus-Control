// FIX: Full implementation of all SVG icons.
import React from 'react';

// FIX: Changed "aria-hidden" to a boolean `true` to match the expected `Booleanish` type in React's SVGProps.
const iconProps = {
  strokeWidth: 1.5,
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export const NexusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...iconProps} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
);

export const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...iconProps} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.002 6.002 0 0 0 6-6H6a6.002 6.002 0 0 0 6 6Zm0 0H8.25m3.75 0H12m0 0v.01M12 18a2.25 2.25 0 0 1-2.25-2.25H14.25A2.25 2.25 0 0 1 12 18Z" />
    </svg>
);

export const ScienceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...iconProps} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 7.5v1.5m0 0-2.096 2.096a3.75 3.75 0 0 0-5.304 5.304L9 18.75m0 0a3.75 3.75 0 0 0 5.304-5.304L7.152 6.348a3.75 3.75 0 0 0-5.304 5.304L9 18.75Z" />
    </svg>
);

export const SocietyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...iconProps} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.75-5.418c-2.348-.35-4.924-.622-7.5-.622-2.576 0-5.152.272-7.5.622A9.094 9.094 0 0 0 6 18.72m12 0a9.043 9.043 0 0 1-12 0m12 0c.037.621.077 1.25.12 1.872m-12.24 0c-.043-.621-.083-1.25-.12-1.872m12.24 0A9.006 9.006 0 0 0 12 3.75c-1.625 0-3.17.42-4.5.1.22" />
    </svg>
);

export const PlanetIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...iconProps} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.875 12c.366.442.733.884 1.125 1.326M10.875 12a4.5 4.5 0 0 1-2.433-1.326" />
    </svg>
);

export const InductionIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...iconProps} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 8.25 7.5-7.5 7.5 7.5" />
    </svg>
);

export const ReasoningIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...iconProps} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
    </svg>
);

export const RecursionIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...iconProps} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-5.234-4.266-9.5-9.5-9.5S.5 6.766.5 12s4.266 9.5 9.5 9.5c4.113 0 7.68-2.622 9-6.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 12a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
    </svg>
);

export const SendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...iconProps} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
    </svg>
);

export const AlertIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...iconProps} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
    </svg>
);

export const OptimizationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...iconProps} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
    </svg>
);

export const CpuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...iconProps} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 8.25v7.5m-7.5-7.5v7.5" />
    </svg>
);

export const QuantumCircuitIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...iconProps} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5v1.5m-3.375-3.375L15 8.25m-5.25-5.25v1.5m-3.375-3.375L6 8.25m-1.5 5.25v-1.5m3.375 3.375L8.25 15m5.25 5.25v-1.5m3.375 3.375L18 15.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
    </svg>
);

export const ShieldIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...iconProps} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Z" />
    </svg>
);

export const ShieldCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = ShieldIcon;

export const RoadmapIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...iconProps} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5 3 11.25m3.75 0L3 7.5M17.25 7.5 21 11.25m-3.75 0L21 7.5m-9 9.75-3-3m-4.5 0v5.25m16.5-5.25v5.25m-16.5-5.25a2.25 2.25 0 0 1 2.25-2.25h12a2.25 2.25 0 0 1 2.25 2.25" />
    </svg>
);

export const BrainCircuitIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...iconProps} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3.75h-3.75v3.75h3.75V3.75Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 3.75h-3.75v3.75h3.75V3.75Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 16.5h-3.75v3.75h3.75v-3.75Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 16.5h-3.75v3.75h3.75v-3.75Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5h7.5M8.25 16.5h7.5M12 3.75v3.75m0 9v3.75" />
    </svg>
);

export const CubeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...iconProps} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25m-9-5.25v9l9 5.25m0-9v9" />
    </svg>
);

export const LockClosedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...iconProps} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
);

export const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...iconProps} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);