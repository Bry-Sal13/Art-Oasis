import React, { useState } from "react";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("default_picture");
  const [displayName, setDisplayName] = useState("Default Display Name");
  const [headerImage, setHeaderImage] = useState("default_header");
  const [firstName, setFirstName] = useState("First Name");
  const [lastName, setLastName] = useState("Last Name");
  const [category, setCategory] = useState("Default Category");


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
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
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(userUrl, fetchConfig);

    if (response.ok) {
      console.log("Form submission successful!");
      setUsername("");
      setEmail("");
      setPassword("");
    } else {
      console.log("Form submission failed!");
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
      <button type="submit">Sign up</button>
    </form>
  );
};

export default SignUpForm;
