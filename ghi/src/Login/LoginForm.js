import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const { login, token } = useToken();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  if (token) {
    navigate("/profile");
  } else {
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      await login(username, password);
      console.log(token);
      setUsername("");
      setPassword("");
      if (token) {
        navigate("/profile");
      } else {
        setErrorMessage("Invalid user or password, please try again.");
      }
      event.target.reset();
    };
    return (
      <form onSubmit={(event) => handleSubmit(event)}>
        <label>
          Username
          <input
            type="string"
            value={username}
            onChange={handleUsernameChange}
          />
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
        <button type="submit">Login</button>
      </form>
    );
  }
};

export default LoginForm;
