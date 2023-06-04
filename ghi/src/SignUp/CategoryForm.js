import React, { useState, useEffect } from "react";
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
      navigate("/picture");
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-6 card">
        <div className="card-body">
          <h1 className="text-center mb-3">What kind of work do you do?</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Art category</label>
              <input
                type="text"
                value={category}
                onChange={handleCategoryChange}
                className="form-control input-field"
              />
            </div>
            <br></br>
            <button
              type="submit"
              className="btn btn-primary btn-block btn-field"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
