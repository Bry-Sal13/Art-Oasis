import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PictureForm = ({ userData, setUserData }) => {
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
    const data = userData.user;
    data.profile_picture = profilePicture;
    data.header_image = headerImage;

    const userUrl = `http://localhost:8000/api/users/${userData.user.username}`;
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
        let newData = userData;
        newData.user = result;
        setUserData(newData);
        navigate("/profile");
      }
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="profilePicture">Profile Picture URL:</label>
          <input
            type="text"
            value={profilePicture}
            onChange={handleProfileImageChange}
          />
        </div>
        <div>
          <label htmlFor="headerImage">Header Image URL:</label>
          <input
            type="text"
            value={headerImage}
            onChange={handleHeaderImageChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PictureForm;
