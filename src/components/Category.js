import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeWidget } from "../redux/widgetSlice";
import Widget from "./Widget";
import AddWidgetModal from "./AddWidgetModel";
import Card from "react-bootstrap/Card";

const Category = ({ category }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleRemoveWidget = (widgetId) => {
    dispatch(removeWidget({ categoryId: category.id, widgetId }));
  };

  return (
    <div className="category">
      <div className="container d-flex">
        <h4>{category.name}</h4>
        <select className="ms-auto ">
          <option>Last 7 days</option>
          <option>Last 1 Week</option>
        </select>
        <button
          className="btn btn-primary ms-2 p-2"
          onClick={() => setShowModal(true)}
        >
          + Add Widget
        </button>
      </div>
      <div className="card-container">
        {category.widgets.map((widget) => (
          <Widget
            key={widget.id}
            widget={widget}
            onRemove={handleRemoveWidget}
          />
        ))}
        <button
          className="btn btn-primary"
          id="addwidget"
          onClick={() => setShowModal(true)}
        >
          + Add Widget
        </button>
        {showModal && (
          <AddWidgetModal
            categoryId={category.id}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
      <div className="container">
        <h4>CSPM Dashboard</h4>
        <div className="card-container">
          <div className="card">
            <div className="card-header">Top 5 Namespace Specific Alert</div>

            <div className="card-body">
              <a>No Graph data Available</a>
            </div>
          </div>

          <div className="card">
            <div className="card-header">Workload Alerts</div>
            <div className="card-body">
              <a>No Graph data Available</a>
            </div>
          </div>
          <div className="card">
            <div className=""></div>
            <div className="card-body">
              <a>+ Add Widget</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
