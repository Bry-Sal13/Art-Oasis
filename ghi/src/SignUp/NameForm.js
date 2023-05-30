import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const NameForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { token } = useAuthContext();
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

    const data = {
      first_name: firstName,
      last_name: lastName,
    };

    const userUrl = `http://localhost:8000/api/users/`;
    const fetchConfig = {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      },
    };

    try {
      const response = await fetch(userUrl, fetchConfig);
      if (response.ok) {
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
        <input type="text" value={firstName} onChange={handleFirstNameChange} />
      </label>
      <br />
      <label>
        Last Name
        <input type="text" value={lastName} onChange={handleLastNameChange} />
      </label>
      <br />
      <button type="submit">Continue</button>
    </form>
  );
};

export default NameForm;
