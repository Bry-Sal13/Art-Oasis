import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NameForm = ({userData}) => {
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
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);

    const data = userData.user;
    data.first_name = firstName;
    data.last_name = lastName;

    const userUrl = `http://localhost:8000/api/users/${userData.user.username}`;
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
        const newData = await response.json();
        console.log(newData);
        navigate("/category");
      }
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name
        <input type="string" value={firstName} onChange={handleFirstNameChange} />
      </label>
      <br />
      <label>
        Last Name
        <input type="string" value={lastName} onChange={handleLastNameChange} />
      </label>
      <br />
      <button type="submit">Continue</button>
    </form>
  );
};

export default NameForm;
