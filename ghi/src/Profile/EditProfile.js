import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  }, []);

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
    <div className="row justify-content-center mt-5">
      <div className="col-6 card">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <h1>Edit Your Profile</h1>
            <input
              value={displayName}
              onChange={(event) => handleChange(event, setDisplayName)}
              className="form-control  mt-0"
              placeholder={`${displayName}`}
            />
            <input
              value={firstName}
              onChange={(event) => handleChange(event, setFirstName)}
              type="text"
              className="form-control"
              placeholder={`${firstName}`}
            />
            <input
              value={lastName}
              onChange={(event) => handleChange(event, setLastName)}
              type="text"
              className="form-control"
              placeholder={`${lastName}`}
            />
            <input
              value={profilePicture}
              onChange={(event) => handleChange(event, setProfilePicture)}
              type="text"
              className="form-control"
              placeholder={`${profilePicture}`}
            />
            <input
              value={headerImage}
              onChange={(event) => handleChange(event, setHeaderImage)}
              type="text"
              className="form-control"
              placeholder={`${headerImage}`}
            />
            <input
              value={category}
              onChange={(event) => handleChange(event, setCategory)}
              type="text"
              className="form-control"
              placeholder={`${category}`}
            />
            <input
              value={about}
              onChange={(event) => handleChange(event, setAbout)}
              type="text"
              className="form-control"
              placeholder={`${about}`}
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
