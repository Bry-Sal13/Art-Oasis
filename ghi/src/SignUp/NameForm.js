import React, { useState } from "react";
import "./Signup.css";
import "./Name.css";
import { useNavigate } from "react-router-dom";

const NameForm = ({ userInfo, setUserInfo }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = userInfo;
    data.first_name = firstName;
    data.last_name = lastName;

    const userUrl = `${process.env.REACT_APP_USERS_SERVICE_API_HOST}/api/users/${userInfo.username}`;
    const fetchConfig = {
      method: "put",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(userUrl, fetchConfig);
      if (response.ok) {
        const result = await response.json();
        let newData = userInfo;
        newData = result;
        setUserInfo(newData);
        navigate("/category");
      }
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  return (
    <div className="nameform-color">
      <div className="container_2">
        <div className="form-container_2">
          <div className="form-groupp fixed-inputt">
            <h1 className="top-text">I'm sorry, I didn't catch your name</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  className="form-control input-field"
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={handleLastNameChange}
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
      </div>
    </div>
  );
};

export default NameForm;
