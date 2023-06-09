import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./Signup.css";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture] = useState(
    "https://as2.ftcdn.net/v2/jpg/00/64/67/63/1000_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
  );
  const [displayName] = useState("Default Display Name");
  const [headerImage] = useState(
    "https://image-assets.eu-2.volcanic.cloud/api/v1/assets/images/de6fa830fed8d7fab6becd4b40c18472?t=1685096677"
  );
  const [firstName] = useState("First Name");
  const [lastName] = useState("Last Name");
  const [category] = useState("Default Category");
  const [about] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat."
  );
  const [passwordShown, setPasswordShown] = useState(false);

  const { login } = useToken();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

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

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage("Please enter all the required information.");
      return;
    }

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

    const userUrl = `${process.env.REACT_APP_USERS_SERVICE_API_HOST}/api/users`;
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
    <div className="signup-color">
      <div className="container_2">
        <div className="form-container_2">
          <div className="form-groupp fixed-inputt">
            <h1 className="text-top">Make the most of your artistic life</h1>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
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
                <i onClick={togglePasswordVisibility} className="password-icon">
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
                <i onClick={togglePasswordVisibility} className="password-icon">
                  {passwordShown ? <FiEyeOff /> : <FiEye />}
                </i>
              </div>
              <label className="cookie">
                By clicking Agree & Join, you agree to the ArtOasis User
                Agreement and{" "}
                <Link to="/cookie" className="cookie-link">
                  Cookie Policy
                </Link>
                .
              </label>
              <br></br>
              <button
                type="submit"
                className="btn btn-black btn-block btn-field"
              >
                Agree & Join
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
