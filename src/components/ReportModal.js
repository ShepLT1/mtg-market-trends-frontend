import React from "react";

export default function ReportModal({ onCancel, onGenerate }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>
          Are you sure you want to generate this report? Generating a report
          consumes a lot of compute resources.
        </p>
        <div className="modal-buttons">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onGenerate}>Generate</button>
        </div>
      </div>
    </div>
  );
}
