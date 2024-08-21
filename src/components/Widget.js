import React from "react";
import ChartWidget from "./ChartWidget";

const Widget = ({ widget, onRemove }) => {
  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5>{widget.name}</h5>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onRemove(widget.id)}
        >
          Remove
        </button>
      </div>
      <div className="card-body">
        <ChartWidget widget={widget} />
      </div>
    </div>
  );
};

export default Widget;
