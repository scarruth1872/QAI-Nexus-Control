// Fix: Replaced placeholder content with a valid React component.
import React from 'react';

interface StructuredResultDisplayProps {
  data: object;
  title: string;
}

const StructuredResultDisplay: React.FC<StructuredResultDisplayProps> = ({ data, title }) => {
  return (
    <div className="module-panel">
      <h3>{title}</h3>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default StructuredResultDisplay;
