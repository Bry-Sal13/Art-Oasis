import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./edit.css";

const EditForm = ({
  userInfo,
  setUserInfo,
  setSocials,
  carousels,
  socials,
  setCarousels,
  token,
  getCarousels,
  getSocials,
  getUsers,
}) => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [headerImage, setHeaderImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [about, setAbout] = useState("");
  const [category, setCategory] = useState("");
  const [social, setSocial] = useState("");
  const [carousel, setCarousel] = useState("");
  const [isLaoding, setIsLoading] = useState(true);

  const handleChange = (event, cb) => {
    const value = event.target.value;
    cb(value);
  };

  useEffect(() => {
    if (userInfo) {
      setDisplayName(userInfo.display_name);
      setProfilePicture(userInfo.profile_picture);
      setHeaderImage(userInfo.header_image);
      setFirstName(userInfo.first_name);
      setLastName(userInfo.last_name);
      setAbout(userInfo.about);
      setCategory(userInfo.category);
      setIsLoading(false);
    }
    let i =
      performance.getEntriesByType("navigation")[0].type === "reload" ? 0 : 1;
    if (i === 1) {
      const timer = setTimeout(() => {
        if (!token) {
          navigate("/login");
        }
      }, 4000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        if (!token) {
          navigate("/login");
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [userInfo, navigate, token]);

  useEffect(() => {
    getSocials();
    getCarousels();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userObject = userInfo;
    if (displayName !== "") {
      userObject.display_name = displayName;
    }
    if (profilePicture !== "") {
      userObject.profile_picture = profilePicture;
    }
    if (headerImage !== "") {
      userObject.header_image = headerImage;
    }
    if (firstName !== "") {
      userObject.first_name = firstName;
    }
    if (lastName !== "") {
      userObject.last_name = lastName;
    }
    if (about !== "") {
      userObject.about = about;
    }
    if (category !== "") {
      userObject.category = category;
    }

    const linkData = {};
    linkData["user_id"] = userInfo.user_id;
    linkData["link"] = social;

    const carouselData = {};
    carouselData["user_id"] = userInfo.user_id;
    carouselData["link"] = carousel;

    const userUrl = `${process.env.REACT_APP_USERS_SERVICE_API_HOST}/api/users/${userInfo.username}`;
    const carouselsUrl = `${process.env.REACT_APP_USERS_SERVICE_API_HOST}/api/carousels`;
    const socialsUrl = `${process.env.REACT_APP_USERS_SERVICE_API_HOST}/api/socials`;

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
        getUsers();
        navigate("/profiles/me");
      }
    } catch (error) {
      console.log("Error updating user info: ", error);
    }
  };

  if (isLaoding) {
    return;
  }
  return (
    <div id="edit-container" className="container">
      <div className="card justify-content-center" style={{ minWidth: "60%" }}>
        <div className="card-body">
          <h1 className="card-title">Edit Your Profile</h1>
          <form onSubmit={handleSubmit} className="g-3">
            <label htmlFor="displayName">Display Name:</label>
            <br />
            <input
              value={displayName}
              onChange={(event) => handleChange(event, setDisplayName)}
              className="form-control mb-3"
              id="displayName"
              placeholder={`${displayName}`}
            />
            <label htmlFor="firstName">First Name:</label>
            <br />
            <input
              value={firstName}
              onChange={(event) => handleChange(event, setFirstName)}
              type="text"
              className="form-control mb-3"
              id="firstName"
              placeholder={`${firstName}`}
            />
            <label htmlFor="lastName">Last Name:</label>
            <br />
            <input
              value={lastName}
              onChange={(event) => handleChange(event, setLastName)}
              type="text"
              className="form-control mb-3"
              id="lastName"
              placeholder={`${lastName}`}
            />
            <label htmlFor="profilePicutre">Profile Picture:</label>
            <br />
            <input
              value={profilePicture}
              onChange={(event) => handleChange(event, setProfilePicture)}
              type="text"
              className="form-control mb-3"
              id="profilePicutre"
              placeholder={`${profilePicture}`}
            />
            <label htmlFor="headerImage">Banner image:</label>
            <br />
            <input
              value={headerImage}
              onChange={(event) => handleChange(event, setHeaderImage)}
              type="text"
              className="form-control mb-3"
              id="headerImage"
              placeholder={`${headerImage}`}
            />
            <label htmlFor="categoryInput">Category text:</label>
            <br />
            <input
              value={category}
              onChange={(event) => handleChange(event, setCategory)}
              type="text"
              className="form-control mb-3"
              id="categoryInput"
              placeholder={`${category}`}
            />
            <label htmlFor="aboutInput">About text:</label>
            <br />
            <textarea
              value={about}
              onChange={(event) => handleChange(event, setAbout)}
              type="text"
              id="aboutInput"
              className="form-control mb-3"
              placeholder={`${about}`}
            />
            <label htmlFor="social">Social Media Link:</label>
            <br />
            <input
              value={social}
              onChange={(event) => handleChange(event, setSocial)}
              type="text"
              id="social"
              className="form-control mb-3"
              placeholder="social media link"
            />
            <label htmlFor="carousel">Image Carousel Link:</label>
            <br />
            <input
              value={carousel}
              onChange={(event) => handleChange(event, setCarousel)}
              type="text"
              id="carousel"
              className="form-control mb-3"
              placeholder="image link"
            />
            <button
              type="submit"
              className="btn btn-primary mb-1"
              style={{ backgroundColor: "#7F669D", borderColor: "#7F669D" }}
            >
              Finish
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
