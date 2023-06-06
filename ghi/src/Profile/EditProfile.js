import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditForm = ({
  userInfo,
  setUserInfo,
  setSocials,
  carousels,
  socials,
  setCarousels,
}) => {
  const navigate = useNavigate();
  if (userInfo === undefined) {
    navigate("/");
  }
  const [displayName, setDisplayName] = useState(userInfo.display_name);
  const [profilePicture, setProfilePicture] = useState(
    userInfo.profile_picture
  );
  const [headerImage, setHeaderImage] = useState(userInfo.header_image);
  const [firstName, setFirstName] = useState(userInfo.first_name);
  const [lastName, setLastName] = useState(userInfo.last_name);
  const [about, setAbout] = useState(userInfo.about);
  const [category, setCategory] = useState(userInfo.category);
  const [social, setSocial] = useState("");
  const [carousel, setCarousel] = useState("");

  const handleChange = (event, cb) => {
    const value = event.target.value;
    cb(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userObject = userInfo;
    userObject.display_name = displayName;
    userObject.profile_picture = profilePicture;
    userObject.header_image = headerImage;
    userObject.first_name = firstName;
    userObject.last_name = lastName;
    userObject.about = about;
    userObject.category = category;

    const linkData = {};
    linkData["user_id"] = userInfo.user_id;
    linkData["link"] = social;

    const carouselData = {};
    carouselData["user_id"] = userInfo.user_id;
    carouselData["link"] = carousel;

    const userUrl = `http://localhost:8000/api/users/${userInfo.username}`;
    const carouselsUrl = "http://localhost:8000/api/carousels";
    const socialsUrl = "http://localhost:8000/api/socials";

    const userConfig = {
      method: "put",
      body: JSON.stringify(userObject),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const socialConfig = {
      method: "post",
      body: JSON.stringify(linkData),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const carouselConfig = {
      method: "post",
      body: JSON.stringify(carouselData),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      if (social) {
        const response = await fetch(socialsUrl, socialConfig);
        if (response.ok) {
          const newSocial = await response.json();
          setSocials(...socials, newSocial);
          setSocial("");
        }
      }
    } catch (error) {
      console.log("Error creating link: ", error);
    }

    try {
      if (carousel) {
        const response = await fetch(carouselsUrl, carouselConfig);
        if (response.ok) {
          const newCarousel = await response.json();
          setCarousels([...carousels, newCarousel]);
          setCarousel("");
        }
      }
    } catch (error) {
      console.log("Error creating image: ", error);
    }

    try {
      const response = await fetch(userUrl, userConfig);
      if (response.ok) {
        const result = await response.json();
        let newData = { ...userInfo };
        newData.user = result;
        setUserInfo(newData);
        console.log("userdata on submit: ", newData);
        navigate("/profile");
      }
    } catch (error) {
      console.log("Error updating user info: ", error);
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-6 card">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <h1>Edit Your Profile</h1>
            <input
              value={displayName}
              onChange={(event) => handleChange(event, setDisplayName)}
              className="form-control  mt-0"
              placeholder={`${userInfo.display_name}`}
            />
            <input
              value={firstName}
              onChange={(event) => handleChange(event, setFirstName)}
              type="text"
              className="form-control"
              placeholder={`${userInfo.first_name}`}
            />
            <input
              value={lastName}
              onChange={(event) => handleChange(event, setLastName)}
              type="text"
              className="form-control"
              placeholder={`${userInfo.last_name}`}
            />
            <input
              value={profilePicture}
              onChange={(event) => handleChange(event, setProfilePicture)}
              type="text"
              className="form-control"
              placeholder={`${userInfo.profile_picture}`}
            />
            <input
              value={headerImage}
              onChange={(event) => handleChange(event, setHeaderImage)}
              type="text"
              className="form-control"
              placeholder={`${userInfo.header_image}`}
            />
            <input
              value={category}
              onChange={(event) => handleChange(event, setCategory)}
              type="text"
              className="form-control"
              placeholder={`${userInfo.category}`}
            />
            <input
              value={about}
              onChange={(event) => handleChange(event, setAbout)}
              type="text"
              className="form-control"
              placeholder={`${userInfo.about}`}
            />
            <input
              value={social}
              onChange={(event) => handleChange(event, setSocial)}
              type="text"
              className="form-control"
              placeholder="social media link"
            />
            <input
              value={carousel}
              onChange={(event) => handleChange(event, setCarousel)}
              type="text"
              className="form-control"
              placeholder="image link"
            />
            <button type="submit" className="w-25 btn btn-primary mb-3">
              Finish
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
