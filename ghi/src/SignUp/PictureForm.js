import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import "./Picture.css";

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

    const userUrl = `${process.env.REACT_APP_USERS_SERVICE_API_HOST}/api/users/${userInfo.username}`;
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
    <div className="pictureform-color">
      <div className="container_2">
        <div className="form-container_2">
          <div className="form-groupp fixed-inputt">
            <h1 className="top-text">Say cheese!</h1>
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
                className="btn btn-black btn-block btn-field"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PictureForm;
