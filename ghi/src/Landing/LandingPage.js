import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import useToken from "@galvanize-inc/jwtdown-for-react";

const LandingPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useToken();
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    login(username, password);
    setPassword("");
    setUsername("");
    setUsername("");
    event.target.reset();
    navigate("/profile");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div>
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold">ArtOasis</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">Welcome to your artistic community</p>
        </div>
      </div>
      <div className="px-4 py-5 my-5 text-center">
        <form onSubmit={handleSubmit}>
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
        <p>New user?</p>
        <button type="button" onClick={handleSignupClick}>
          Signup
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
