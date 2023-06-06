import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, _] = useState(
    "https://as2.ftcdn.net/v2/jpg/00/64/67/63/1000_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
  );
  const [displayName, __] = useState("Default Display Name");
  const [headerImage, ___] = useState(
    "https://image-assets.eu-2.volcanic.cloud/api/v1/assets/images/de6fa830fed8d7fab6becd4b40c18472?t=1685096677"
  );
  const [firstName, ____] = useState("First Name");
  const [lastName, ______] = useState("Last Name");
  const [category, _______] = useState("Default Category");
  const [about, ________] = useState("Default About");
  const { login } = useToken();
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
      email: email,
      profile_picture: profilePicture,
      display_name: displayName,
      header_image: headerImage,
      first_name: firstName,
      last_name: lastName,
      password: password,
      username: username,
      category: category,
      about: about,
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
      if (password === confirmPassword) {
        const response = await fetch(userUrl, fetchConfig);
        if (response.ok) {
          await login(username, password);
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          navigate("/name");
        } else {
          console.log("Form submission failed!");
        }
      } else {
        throw new Error("Passwords do not match!");
        //TODO: Maybe put an alert here?
      }
    } catch (error) {
      console.log("Error submitting form:", error);
    }
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
      <button style={{ display: "None" }} type="submit">
        Done
      </button>
      <button>Next</button>
    </form>
  );
};

export default SignUpForm;
