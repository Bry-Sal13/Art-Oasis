import React, { useState } from "react";
import "../gradient.css";
import { useNavigate } from "react-router-dom";

const PictureForm = ({ userInfo, setUserInfo }) => {
    const [profilePicture, setProfilePicture] = useState("");
    const [headerImage, setHeaderImage] = useState("");
    const navigate = useNavigate();

    const handleProfileImageChange = (event) => {
        setProfilePicture(event.target.value);
    };

    const handleHeaderImageChange = (event) => {
        setHeaderImage(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = userInfo;
        data.profile_picture = profilePicture;
        data.header_image = headerImage;

        const userUrl = `http://localhost:8000/api/users/${userInfo.username}`;
        const fetchConfig = {
            method: "put",
            body: JSON.stringify(data),
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        };

    try {
      const response = await fetch(userUrl, fetchConfig);
      if (response.ok) {
        const result = await response.json();
        let newData = userInfo;
        newData.user = result;
        setUserInfo(newData);
        navigate("/profiles/me");
      }
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-6 card">
                <div className="card-body">
                    <h1 className="text-center mb-3">Say cheese</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Profile picture</label>
                            <input
                                type="text"
                                value={profilePicture}
                                onChange={handleProfileImageChange}
                                className="form-control input-field"
                            />
                        </div>
                        <div className="form-group">
                            <label>Banner Image</label>
                            <input
                                type="text"
                                value={headerImage}
                                onChange={handleHeaderImageChange}
                                className="form-control input-field"
                            />
                        </div>
                        <br></br>
                        <button
                            type="submit"
                            className="btn btn-primary btn-block btn-field">
                            Continue
                        </button>
                    </form>
                </div>
            </div>
            <div className="footer"></div>
        </div>
    );
};

export default PictureForm;
