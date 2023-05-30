import React, { useState } from "react";

const PictureForm = ({getToken}) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [headerImage, setHeaderImage] = useState(null);

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
  };

  const handleHeaderImageChange = (event) => {
    const file = event.target.files[0];
    setHeaderImage(file);
  };

  //TODO!!!!!:
  // Upload the images to the backend
  // Then - Implement your backend logic here to handle the file uploads
  // (Look up these) = Axios or Fetch to send the images to your backend API
  // Reset the form
  const handleSubmit = async (event) => {
    event.preventDefault();

    const userUrl = "http://localhost:8000/api/users";

    let formData = new FormData();

    formData.append("profile_picture", profilePicture);
    formData.append("header_image", headerImage);

    try {
      const response = await fetch(userUrl, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });

      if (response.ok) {
        setProfilePicture(null);
        setHeaderImage(null);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };


  return (
    <div>
      <h1>Profile Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="profileImage">Profile Picture:</label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleProfileImageChange}
          />
        </div>
        <div>
          <label htmlFor="headerImage">Header Image:</label>
          <input
            type="file"
            id="headerImage"
            accept="image/*"
            onChange={handleHeaderImageChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PictureForm;
