import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./LandingPage.css";

const LandingPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
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
    event.target.reset();
    navigate("/profile");
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 form-container">
          <div className="form-group fixed-input">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="form2Example1">
                  Username
                </label>
                <input
                  type="text"
                  id="form2Example1"
                  value={username}
                  onChange={handleUsernameChange}
                  className="form-control input-field"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="form2Example2">
                  Password
                </label>
                <input
                  type={passwordShown ? "text" : "password"}
                  id="form2Example2"
                  value={password}
                  onChange={handlePasswordChange}
                  className="form-control input-field"
                />
                <i onClick={togglePasswordVisiblity} className="password-icon">
                  {passwordShown ? <FiEyeOff /> : <FiEye />}
                </i>
              </div>
              <br></br>
              <button
                type="submit"
                className="btn btn-primary btn-block btn-field"
              >
                Sign in
              </button>
            </form>
            <button
              type="button"
              onClick={handleSignupClick}
              className="btn btn-primary btn-block btn-field btn-outline"
            >
              New to ArtOasis? Join Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
