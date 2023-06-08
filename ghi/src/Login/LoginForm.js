import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import "../gradient.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

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
        setUsername("");
        setPassword("");
        event.target.reset();
        const timer = setTimeout(() => {
            if (!token) {
                setErrorMessage("Invalid username or password");
            }
        }, 350);
        return () => clearTimeout(timer);
    };
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

  useEffect(() => {
    if (token) {
      navigate("/profiles/me");
    }
  }, [token, navigate]);

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-6 card">
                <div className="card-body">
                    <h1 className="text-center mb-3">Sign in</h1>
                    <h4>Stay updated on your artistic world</h4>
                    {errorMessage && (
                        <p className="text-danger">{errorMessage}</p>
                    )}
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
                            <i
                                onClick={togglePasswordVisiblity}
                                className="password-icon">
                                {passwordShown ? <FiEyeOff /> : <FiEye />}
                            </i>
                        </div>
                        <br></br>
                        <button
                            type="submit"
                            className="btn btn-primary btn-block btn-field">
                            Sign in
                        </button>
                    </form>
                </div>
                <p className="text-center mt-3">
                    New to ArtOasis?{" "}
                    <Link
                        to="/signup"
                        className="join-now-link btn mx-3 btn-primary">
                        Join now
                    </Link>
                </p>
            </div>
            <div className="footer"></div>
        </div>
    );
};

export default LoginForm;
