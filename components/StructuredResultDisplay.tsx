import React from 'react';

interface StructuredResultDisplayProps {
  result: string;
}

const renderValue = (value: any) => {
    if (typeof value === 'string') {
        return <span className="text-amber-300">"{value}"</span>;
    }
    if (typeof value === 'number') {
        return <span className="text-cyan-300">{value}</span>;
    }
    if (typeof value === 'boolean') {
        return <span className="text-rose-400">{String(value)}</span>;
    }
    if (value === null) {
        return <span className="text-gray-500">null</span>;
    }
    return <span className="text-gray-200">{String(value)}</span>;
};


export const StructuredResultDisplay: React.FC<StructuredResultDisplayProps> = ({ result }) => {
  let parsedResult: object | null = null;
  
  try {
    parsedResult = JSON.parse(result);
  } catch (e) {
    // Not valid JSON, will render as plain text
  }

  if (parsedResult && typeof parsedResult === 'object' && !Array.isArray(parsedResult) && parsedResult !== null) {
    return (
      <div className="text-xs font-mono p-3 bg-black/30 rounded-md mt-1 border border-indigo-500/10">
        <div className="text-gray-400">{'{'}</div>
        <div className="pl-4">
            {Object.entries(parsedResult).map(([key, value], index, arr) => (
                <div key={key}>
                    <span className="text-indigo-300">"{key}"</span>
                    <span className="text-gray-500">: </span>
                    {renderValue(value)}
                    {index < arr.length - 1 ? <span className="text-gray-500">,</span> : ''}
                </div>
            ))}
        </div>
        <div className="text-gray-400">{'}'}</div>
      </div>
    );
  }

  // Fallback for non-JSON or malformed JSON strings
  return (
    <pre className="text-gray-300 whitespace-pre-wrap p-3 bg-black/30 rounded-md mt-1 text-xs border border-indigo-500/10">
      <code>{result}</code>
    </pre>
  );
};
