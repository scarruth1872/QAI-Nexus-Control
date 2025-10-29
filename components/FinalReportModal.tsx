// Fix: Implemented the FinalReportModal component.
import React from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { FinalReportData } from '../types';

interface FinalReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: FinalReportData;
}

const FinalReportModal: React.FC<FinalReportModalProps> = ({ isOpen, onClose, report }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content module-panel" onClick={(e) => e.stopPropagation()}>
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

        <button onClick={onClose} style={{ marginTop: '1rem' }}>Acknowledge & Close</button>
      </div>
    </div>
  );
};

export default FinalReportModal;