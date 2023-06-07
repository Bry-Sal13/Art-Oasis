import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

function UserProfile({ posts, userInfo, carousels, socials }) {
  const [postsNum, setPostsNum] = useState(10);
  const navigate = useNavigate();

  if (userInfo !== "" && userInfo !== null && userInfo !== undefined) {
    socials = socials || [];
    carousels = carousels || [];
    let filteredPosts = [];
    let filteredCarousels = [];
    let filteredSocials = [];

    if (posts.length !== 0 && Array.isArray(posts)) {
      filteredPosts = posts.filter((post) => {
        return post.user_id === userInfo.user_id;
      });
    }

    if (carousels.length !== 0 && Array.isArray(carousels)) {
      filteredCarousels = carousels.filter((carousel) => {
        return carousel.user_id === userInfo.user_id;
      });
    }

    if (socials.length !== 0 && Array.isArray(socials)) {
      filteredSocials = socials.filter((social) => {
        return social.user_id === userInfo.user_id;
      });
    }

    const slicedPosts = filteredPosts.slice(0, postsNum);

    const handlePosts = () => {
      setPostsNum(postsNum + 10);
    };

    if (userInfo !== "" && userInfo !== null && userInfo !== undefined) {
      return (
        <div className="container">
          <div className="row mt-5 mx-3">
            <div className="card mb-5">
              <div
                className="card-header mt-3 d-flex  justify-content-between  align-items-center"
                style={{
                  backgroundImage: `url(${userInfo.header_image})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                }}
              >
                <div
                  className="d-flex flex-column-reverse align-items-center"
                  style={{
                    backgroundImage: `url(${userInfo.profile_picture})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    backgroundSize: "128px",
                    width: "128px",
                    height: "128px",
                  }}
                >
                  <small className="display-name">
                    <strong>{userInfo.display_name}</strong>
                  </small>
                </div>

                <h5 className="align-self-end flex-shrink-1">{`${userInfo.first_name} ${userInfo.last_name}`}</h5>
                <button
                  className="btn btn-dark align-self-end flex-shrink-1"
                  onClick={() => navigate("/profile/edit")}
                >
                  edit profile
                </button>
              </div>
              <div className="d-flex flex-column align-content-evenly flex-wrap">
                <div className="p-2">
                  <h2 className="text-center">About Me</h2>
                  <p>{`${userInfo.about}`}</p>
                </div>
              </div>
              <h2 className="text-center">My Socials</h2>
              <div className="d-flex justify-content-evenly flex-wrap mx-5">
                {filteredSocials.map((social) => {
                  if (social.link.includes(".com")) {
                    return (
                      <a
                        key={social.id}
                        href={social.link}
                        className="profile-link mx-3"
                      >
                        {social.link}
                      </a>
                    );
                  } else {
                    return (
                      <p key={social.id} className="mx-3">
                        {social.link}
                      </p>
                    );
                  }
                })}
              </div>
              <div
                id="carousel"
                className="carousel carousel-dark slide m-3"
                data-bs-interval="false"
              >
                <div className="carousel-inner">
                  {filteredCarousels.map((image, index) => {
                    if (filteredCarousels.length === 0) {
                      return (
                        <div
                          className={`carousel-item item ${
                            index === 0 ? "active" : ""
                          }`}
                        >
                          <img
                            src="https://craftsnippets.com/articles_images/placeholder/placeholder.jpg"
                            alt="..."
                            className="d-block w-100"
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div
                          className={`carousel-item item ${
                            index === 0 ? "active" : ""
                          }`}
                          key={image.id}
                        >
                          <img
                            src={image.link}
                            alt="..."
                            className="d-block w-100"
                          />
                        </div>
                      );
                    }
                  })}
                </div>
                {filteredCarousels.length > 0 && (
                  <>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carousel"
                      data-bs-slide="prev"
                      id="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carousel"
                      data-bs-slide="next"
                      id="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </>
                )}
              </div>
              <div className="text-center">
                <h4 className="m-3">Activity</h4>
                {slicedPosts.map((post) => {
                  return (
                    <div className="card m-3 " key={post.id}>
                      <div className="card-header d-flex flex-column">
                        <div>
                          <img
                            src={userInfo.profile_picture}
                            alt="user pfp"
                            className="rounded img-thumbnail"
                            style={{ width: "48px", float: "left" }}
                          />
                          <small className="m-3" style={{ float: "left" }}>
                            <strong>{userInfo.display_name}</strong>
                          </small>
                        </div>
                        <div>
                          <img
                            src={post.image}
                            className="rounded mb-3"
                            alt="post pic"
                          />
                          <p>{post.text}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {filteredPosts.length > postsNum && (
                  <button
                    className="btn btn-success m-3 btn-sm"
                    onClick={handlePosts}
                  >
                    Show More
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="row"></div>
        </div>
      );
    } else {
      return (
        <div className="d-center">
          <h4
            className="alert alert-danger m-5 position-absolute top-50 start-50 translate-middle"
            style={{ width: "400px" }}
          >
            could not get user info -
            <br />
            please log in and try again
          </h4>
        </div>
      );
    }
  }
}

export default UserProfile;
