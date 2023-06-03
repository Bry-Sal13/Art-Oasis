import React from "react";
import './profile.css'

function UserProfile({posts, userData, carousels, socials}) {
  let postsNum = 10;





  const filteredSocials = socials.filter(
    (social) => {
      return social.user_id === userData.user.user_id
    }
  );


  const filteredCarousels = carousels.filter(
    (carousel) => {
      return carousel.user_id === userData.user.user_id
    }
  );

  const handlePosts = () => {
    console.log(postsNum);
    return filteredPosts.slice(0, postsNum += 10);
  }

  const filteredPosts = posts.filter((post) => {
    return (post.user_id = userData.user.user_id);
  });

  const user = userData.user

  if (userData !== "" && userData !== null && userData !== undefined){
    return (
      <div className="container">
        <div className="row mt-5 mx-3">
          <div className="card mb-5">
            <div
              className="card-header mt-3 d-flex d-flex justify-content-between  align-items-center"
              style={{
                backgroundImage: `url(${userData.user.header_image})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            >
              <img
                src={userData.user.profile_picture}
                alt="user pfp"
                className="rounded img-thumbnail align-self-"
                style={{ width: "128px" }}
              />
              <h5 className="align-self-end flex-shrink-1">{`${user.first_name} ${user.last_name}`}</h5>
              <button className="btn btn-dark align-self-end flex-shrink-1">
                edit profile
              </button>
            </div>
            <div className="d-flex flex-column align-content-evenly flex-wrap">
              <div className="p-2">
                <h2 className="text-center">About Me</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                  natoque penatibus et magnis dis parturient montes, nascetur
                  ridiculus mus
                </p>
              </div>
            </div>
            <h2 className="text-center">My Socials</h2>
            <div className="d-flex justify-content-evenly">
              <p>https://twitter.com/</p>
              <p>https://www.youtube.com/</p>
              <p>https://www.deviantart.com/</p>
              <p>discord#3323</p>
            </div>
            <div
              id="carousel"
              className="carousel carousel-dark slide m-3"
              data-bs-interval="false"
            >
              <div className="carousel-inner">
                {filteredCarousels.map((image, index) => {
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
                })}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carousel"
                data-bs-slide="prev"
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
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            <div className="text-center">
              <h4 className="m-3">Activity</h4>
              <p>POSTS GOES HERE</p>
              <p>POSTS GOES HERE</p>
              <p>POSTS GOES HERE</p>
              <p>POSTS GOES HERE</p>
              <p>POSTS GOES HERE</p>
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
          <br/>
          please log in and try again
        </h4>
      </div>
    );
  }
  
}

export default UserProfile;
