import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryForm = ({ setUserData, userData }) => {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // TODO: Update category in the back-end
    const data = userData.user;
    data.category = category;
    const userUrl = `http://localhost:8000/api/users/${userData.user.username}`;
    const fetchConfig = {
      method: "put",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(userUrl, fetchConfig);
    if (response.ok) {
      const result = await response.json();
      let newData = userData;
      newData.user = result;
      setUserData(newData);
      navigate("/profile");
    }
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
