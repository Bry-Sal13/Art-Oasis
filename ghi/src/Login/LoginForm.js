import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../SignUp/Signup.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const { login, token } = useToken();
  const [errorMessage, setErrorMessage] = useState("");
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
    console.log(token);
    setUsername("");
    setPassword("");
    event.target.reset();
    if (!token) {
      setErrorMessage("Invalid username or password");
    }
  };
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [token]);

  return (
    <div className="container">
      <div className="container_2">
        <div className="form-container_2">
          <div className="form-groupp fixed-inputt mt-3">
            <h1 className="top-text">Sign in</h1>
            <h4 classname="top-text">Stay updated on your artistic world</h4>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>User Name</label>
                <input
                  type="string"
                  value={username}
                  onChange={handleUsernameChange}
                  className="form-control input-field"
                />
              </div>
              <div className="form-group password">
                <label>Password</label>
                <input
                  type={passwordShown ? "text" : "password"}
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
                className="btn btn-black btn-block btn-field"
              >
                Sign in
              </button>
            </form>
          </div>
          <p className="text-center mt-3">
            New to ArtOasis?{" "}
            <Link to="/signup" className="join-now-link">
              Join now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
