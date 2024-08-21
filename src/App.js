import React from "react";
import { useSelector } from "react-redux";
import Category from "./components/Category";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const App = () => {
  const { categories } = useSelector((state) => state.widgets);

  return (
    <div className="container">
      <header className="my-4">
        <h4>Dashboard</h4>
      </header>
      {Array.isArray(categories) && categories.length > 0 ? (
        categories.map((category) => (
          <Category key={category.id} category={category} />
        ))
      ) : (
        <p>No categories available</p>
      )}
    </div>
  );
};

export default App;
