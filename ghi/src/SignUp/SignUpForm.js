import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { FiEye, FiEyeOff } from "react-icons/fi";

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
  const [passwordShown, setPasswordShown] = useState(false);
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

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
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
      if (password === confirmPassword) {
        const response = await fetch(userUrl, fetchConfig);

        if (response.ok) {
          login(username, password);
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
    <div className="row justify-content-center mt-5">
      <div className="col-6 card">
        <div className="card-body">
          <h1 className="text-center mb-3">
            Make the most of your artistic life
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className="form-control input-field"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="form-control input-field"
              />
            </div>
            <div className="form-group">
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
            <div className="form-group">
              <label>Confirm password</label>
              <input
                type={passwordShown ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="form-control input-field"
              />
              <i onClick={togglePasswordVisiblity} className="password-icon">
                {passwordShown ? <FiEyeOff /> : <FiEye />}
              </i>
            </div>
            <br></br>
            <label>
              By clicking Agree & Join, you agree to the ArtOasis User Agreement
              and{" "}
              <Link to="/cookie" className="cookie-link">
                Cookie Policy
              </Link>
              .
            </label>
            <button
              type="submit"
              className="btn btn-primary btn-block btn-field"
            >
              Agree & Join
            </button>
          </form>
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default SignUpForm;
