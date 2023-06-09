import React, { useState } from "react";
import "../gradient.css";
import "./Signup.css";
import "./Category.css";
import { useNavigate } from "react-router-dom";

const CategoryForm = ({ setUserInfo, userInfo }) => {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = userInfo;
    data.category = category;
    const userUrl = `${process.env.REACT_APP_USERS_SERVICE_API_HOST}/api/users/${userInfo.username}`;
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
      let newData = userInfo;
      newData.user = result;
      setUserInfo(newData);
      navigate("/picture");
    }
  };

  return (
    <div className="category-color">
      <div className="container_2">
        <div className="form-container_2">
          <div className="form-groupp fixed-inputt">
            <h1 className="top-text">What kind of work do you do?</h1>
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
                className="btn btn-black btn-block btn-field"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
        <div className="footer"></div>
      </div>
    </div>
  );
};

export default CategoryForm;
