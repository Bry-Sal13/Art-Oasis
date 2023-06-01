import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, _] = useState("default_picture");
  const [displayName, __] = useState("Default Display Name");
  const [headerImage, ___] = useState("default_header");
  const [firstName, ____] = useState("First Name");
  const [lastName, ______] = useState("Last Name");
  const [category, _______] = useState("Default Category");
  const navigate = useNavigate();

  

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

const handleSubmit = async (event) => {
  event.preventDefault();
  const data = {
    username: username,
    email: email,
    password: password,
    profile_picture: profilePicture,
    display_name: displayName,
    header_image: headerImage,
    first_name: firstName,
    last_name: lastName,
    category: category,
  };

  const userUrl = "http://localhost:8000/api/users";
  const fetchConfig = {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
  };

  try {
    if (password === confirmPassword){
      const response = await fetch(userUrl, fetchConfig);

      if (response.ok) {
        const newUser = await response.json();
        console.log(newUser);
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        
        // navigate("/name");
      } else {
        console.log("Form submission failed!");
      }
    }
    else{
      throw new Error("Passwords do not match!")
      //TODO: Maybe put an alert here?
    }
   
  } catch (error) {
    console.log("Error submitting form:", error);
  }

  console.log("Email:", email);
  console.log("Password:", password);
};


  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label>
        Email
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <br />
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <br />
      <label>
        Confirm password
        <input
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </label>
      <br />
      <button style={{display:"None"}} type="submit">Done</button>
      <button>Next</button>
    </form>
  );
};

export default SignUpForm;

// Should we have to register the email first, send the user an email to register?