// Fix: Replaced placeholder content with a valid React component.
import React from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { FinalReportData } from '../types';

interface FinalReportProps {
  report: FinalReportData;
}

const FinalReport: React.FC<FinalReportProps> = ({ report }) => {
  return (
    <div className="module-panel">
      <h3>Mission Final Report</h3>
      <h4>Summary</h4>
      <p>{report.summary}</p>
      <h4>Outcomes</h4>
      <ul>
        {report.outcomes.map((outcome, index) => (
          <li key={index}>{outcome}</li>
        ))}
      </ul>
      <h4>Recommendations</h4>
      <ul>
        {report.recommendations.map((rec, index) => (
          <li key={index}>{rec}</li>
        ))}
      </ul>
    </div>
  );
};

export default FinalReport;