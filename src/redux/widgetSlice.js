import { createSlice } from "@reduxjs/toolkit";
import initialData from "../data.json"; // Assuming your initial data is imported from a JSON file

const widgetSlice = createSlice({
  name: "widgets",
  initialState: {
    categories: initialData.categories,
    availableWidgets: [
      { id: "widget1", name: "Cloud Accounts", type: "pie" },
      { id: "widget2", name: "Cloud Risk Assessment", type: "pie" },
    ],
  },
  reducers: {
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category && !category.widgets.some((w) => w.id === widget.id)) {
        category.widgets.push(widget);
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter(
          (widget) => widget.id !== widgetId
        );
      }
    },
    addNewWidget: (state, action) => {
      const newWidget = action.payload;
      if (
        !state.availableWidgets.some((widget) => widget.id === newWidget.id)
      ) {
        state.availableWidgets.push(newWidget);
      }
    },
  },
});

export const { addWidget, removeWidget, addNewWidget } = widgetSlice.actions;
export default widgetSlice.reducer;
