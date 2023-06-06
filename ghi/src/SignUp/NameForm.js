import React, { useState } from "react";
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

    const userUrl = `http://localhost:8000/api/users/${userInfo.username}`;
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
    <div className="row justify-content-center mt-5">
      <div className="col-6 card">
        <div className="card-body">
          <h1 className="text-center mb-3">
            I'm sorry, I didn't catch your name
          </h1>
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
              className="btn btn-primary btn-block btn-field"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default NameForm;
