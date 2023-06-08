import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../gradient.css";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./LandingPage.css";
import MyImage from "./PNG_Master.png";

const LandingPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { login, token } = useToken();
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(username, password);
    setPassword("");
    setUsername("");
    event.target.reset();
    if (!token) {
      setErrorMessage("Invalid username or password");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [token, navigate]);

  return (
    <div className="my-main-container">
      <div className="container mt-5">
        <div id="row-1" className="row">
          <div className="form-container">
            <div className="form-group fixed-input">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className="top-text">Connection Starts Here</div>
                  {errorMessage && (
                    <p className="text-danger">{errorMessage}</p>
                  )}
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
                  <i
                    onClick={togglePasswordVisibility}
                    className="password-icon"
                  >
                    {passwordShown ? <FiEyeOff /> : <FiEye />}
                  </i>
                </div>
                <br />
                <button
                  type="submit"
                  className="btn btn-black btn-block btn-field"
                >
                  Sign in
                </button>
              </form>
              <br />
              <button
                type="button"
                onClick={handleSignupClick}
                className="btn btn-white btn-block btn-field"
              >
                New to ArtOasis? Join Now
              </button>
            </div>
          </div>
        </div>
        <div className="img-container row">
          <img src={MyImage} alt="Art" className="img-fluid" />
        </div>
        <div className="footer">
          <div className="footer-bottom">
            <h1 className="center-text">ArtOasis</h1>
            <h1 className="copyright">ArtOasis ©{new Date().getFullYear()}</h1>
            <div className="bottom-line"></div>
          </div>
          <div className="footer-container">
            <div className="footer-column1">
              <h6 className="footie-title">Directory</h6>
              <p className="footie-words">Learning</p>
              <p className="footie-words">Products</p>
              <p className="footie-words">Featured</p>
              <p className="footie-words">Love you</p>
              <p className="footie-words">Partnerships</p>
            </div>
            <div className="footer-column2">
              <h6 className="footie-title">Contact</h6>
              <p className="footie-words">Help</p>
              <p className="footie-words">Discover</p>
              <p className="footie-words">Meet us</p>
              <p className="footie-words">About us</p>
            </div>
            <div className="footer-column3">
              <h6 className="footie-title">Company</h6>
              <p className="footie-words">About</p>
              <p className="footie-words">Careers</p>
              <p className="footie-words">Brand kit</p>
              <p className="footie-words">Contact us</p>
              <p className="footie-words">Meet the team</p>
            </div>
            <div className="footer-column3">
              <h6 className="footie-title">General</h6>
              <p className="footie-words">Help Center</p>
              <p className="footie-words">Press</p>
              <p className="footie-words">Blog kit</p>
              <p className="footie-words">Hi mom</p>
              <p className="footie-words">Developers</p>
            </div>
            <div className="footer-column3">
              <h6 className="footie-title">Research</h6>
              <p className="footie-words">Science</p>
              <p className="footie-words">Aliens</p>
              <p className="footie-words">Time Travel</p>
              <p className="footie-words">Love Machine</p>
              <p className="footie-words">Dinosours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
