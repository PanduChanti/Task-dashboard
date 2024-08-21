import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWidget, addNewWidget, removeWidget } from "../redux/widgetSlice";

const AddWidgetModal = ({ categoryId, onClose }) => {
  const [selectedWidgets, setSelectedWidgets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newWidgetName, setNewWidgetName] = useState("");
  const [newWidgetType, setNewWidgetType] = useState("pie");
  const dispatch = useDispatch();
  const { categories, availableWidgets } = useSelector(
    (state) => state.widgets
  );

  const filteredWidgets = availableWidgets.filter((widget) =>
    widget.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCheckboxChange = (widgetId) => {
    setSelectedWidgets((prevState) =>
      prevState.includes(widgetId)
        ? prevState.filter((id) => id !== widgetId)
        : [...prevState, widgetId]
    );
  };

  const handleAddWidgets = () => {
    selectedWidgets.forEach((widgetId) => {
      const widget = availableWidgets.find((w) => w.id === widgetId);
      if (widget) {
        dispatch(addWidget({ categoryId, widget }));
      }
    });
    onClose();
  };

  const handleRemoveWidget = (widgetId) => {
    setSelectedWidgets((prevState) =>
      prevState.filter((id) => id !== widgetId)
    );
    dispatch(removeWidget({ categoryId, widgetId }));
  };

  const handleAddNewWidget = () => {
    const newWidget = {
      id: Date.now().toString(),
      name: newWidgetName,
      type: newWidgetType,
    };
    dispatch(addNewWidget(newWidget));
    handleCheckboxChange(newWidget.id);
    setNewWidgetName("");
    setNewWidgetType("pie");
  };

  return (
    <div className="modal fade show" tabIndex="-1" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Widget</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Search Widgets</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search widgets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Select Widgets</label>
              {filteredWidgets.length > 0 ? (
                <div className="form-check">
                  {filteredWidgets.map((widget) => (
                    <div
                      key={widget.id}
                      className="form-check d-flex align-items-center justify-content-between"
                    >
                      <div>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`widget-${widget.id}`}
                          checked={selectedWidgets.includes(widget.id)}
                          onChange={() => handleCheckboxChange(widget.id)}
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor={`widget-${widget.id}`}
                        >
                          {widget.name}
                        </label>
                      </div>
                      {selectedWidgets.includes(widget.id) && (
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => handleRemoveWidget(widget.id)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p>No widgets found.</p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Add New Widget</label>
              <input
                type="text"
                className="form-control"
                placeholder="Widget Name"
                required
                value={newWidgetName}
                onChange={(e) => setNewWidgetName(e.target.value)}
              />
              <select
                className="form-select mt-2"
                value={newWidgetType}
                onChange={(e) => setNewWidgetType(e.target.value)}
              >
                <option value="pie">Pie</option>
                {/* Add more widget types if needed */}
              </select>
              <button
                type="button"
                className="btn btn-success mt-2"
                onClick={handleAddNewWidget}
              >
                Add New Widget
              </button>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddWidgets}
            >
              Add Selected Widgets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal;
