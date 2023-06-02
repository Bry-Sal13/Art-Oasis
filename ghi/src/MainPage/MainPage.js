import React from "react";
import { NavLink } from "react-router-dom";

function MainPage({ posts, userData, users }) {
  // async handlePostLike = (event) {
  //   onSubmit(event.target.value);
  // };

  // const handlePostComment = (event) => {
  //   onSubmit(event.target.value);
  // };

  console.log(userData);
  return (
    <>
      <div className="container text-center">
        <div className="row g-3">
          <div id="liveAlertPlaceholder"></div>
          <div className="col">
            {/* Profile Card */}
            <div className="container d-flex justify-content-center align-items-center bg-light-purp">
              <div className="card">
                <div className="upper">
                  <img src={userData.user.header_image} className="img-fluid" />
                </div>

                <div className="user text-center">
                  <div className="profile">
                    <img
                      src={userData.user.image}
                      className="rounded-circle"
                      width="80"
                    />
                  </div>
                </div>

                <div className="mt-5 text-center">
                  <h4 className="mb-0">{userData.user.display_name}</h4>
                  <span className="text-muted d-block mb-2"></span>

                  <button className="btn btn-primary btn-sm follow">
                    Follow
                  </button>
                  <div className="d-flex justify-content-between align-items-center mt-4 px-4">
                    <div className="stats">
                      <h6 className="mb-0">Connections</h6>
                      <span>connections.filter</span>
                    </div>
                    <div className="stats">
                      <h6 className="mb-0">Projects</h6>
                      <span></span>
                    </div>
                    <div className="stats">
                      <h6 className="mb-0">Ranks</h6>
                      <span>129</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            {/*Main Feed and create Post Col*/}
            <div classNameName="main-feed">
              {posts.map((post) => (
                <posts
                  key={post.id}
                  profilePic={post.data.profilePic}
                  username={post.data.username}
                  image={post.data.image}
                />
              ))}
            </div>
          </div>

          <div className="col">
            {/*Recommended Profiles*/}
            <div classNameName="rec-profiles">
              {users.slice(0, 20).map((user) => {
                return (
                  <div classNameName="rec-results" key={user.user_id}>
                    <NavLink
                      to={`/profile/${user.username}`}
                      classNameName="userItem"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <p classNameName="text-align-right">
                        {user.display_name}
                      </p>
                      <img
                        classNameName="left-align"
                        src={user.profile_picture}
                        alt="Profile"
                      />
                    </NavLink>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default MainPage;
