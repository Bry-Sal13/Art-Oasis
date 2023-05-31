import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryForm = () => {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Category:", category);
    // TODO: Update category in the back-end
    navigate("/confirmation");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Which type of art do you do?
        <input type="text" value={category} onChange={handleCategoryChange} />
      </label>
      <br />
      <button type="submit">Continue</button>
    </form>
  );
};

export default CategoryForm;
