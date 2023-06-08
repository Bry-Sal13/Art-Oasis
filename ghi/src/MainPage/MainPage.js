import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";

function MyProfileSidebar({ connections, userInfo, posts }) {
  const [following, setFollowing] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [postNum, setPostNum] = useState(0);

  const getUserStats = () => {
    const followingNum = connections.filter((connection) => {
      return connection.user_id === userInfo.user_id;
    });

    const followerNum = connections.filter((connection) => {
      return connection.following_id === userInfo.user_id;
    });

    const postNum = posts.filter((post) => {
      return post.username === userInfo.username;
    });
    setPostNum(postNum.length);
    setFollowers(followerNum.length);
    setFollowing(followingNum.length);
  };

  useEffect(() => {
    if (userInfo && (posts.length !== 0 || connections.length !== 0)) {
      getUserStats();
    }
  }, [userInfo, connections, posts]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div id="card-profile" className="card">
      <div className="upper">
        <div
          id="profile-card-header"
          style={{
            backgroundImage: `url(${userInfo.header_image})`,
          }}
        ></div>
      </div>
      <div className="user text-center">
        <div id="profile">
          <img
            id="profile-picture"
            src={userInfo.profile_picture}
            className="rounded-circle"
            alt="profile"
          />
        </div>
      </div>
      <div className="mt-5 text-center">
        <h4 className="mb-0">{userInfo.display_name}</h4>
        <span className="text-muted d-block mb-2"></span>
        <span className="text-muted d-block mb-2">{userInfo.category}</span>
        <div id="stats-container">
          <div className="stats">
            <h6 className="mb-0">Following</h6>
            <span>{following}</span>
            <h6 className="mb-0">Followers</h6>
            <span>{followers}</span>
            <h6 className="mb-0">Posts</h6>
            <span>{postNum}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CreatePost({ userInfo, getPosts }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handlePicUrlChange = (event) => {
    setImage(event.target.value);
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    const username = userInfo.username;
    const url = "http://localhost:8010/api/posts/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify({ username, text, image }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        setImage("");
        setText("");
        getPosts();
      }
    } catch (error) {
      console.log("error creating post: ", error);
    }
  };
  return (
    <div id="post" className="card">
      <div className="card-header">Create a Post</div>
      <div id="create-comment-body" className="card-body">
        <div className="row align-items-center">
          <form onSubmit={handlePostSubmit}>
            <label htmlFor="picUrl">Picture Url:</label>
            <br />
            <input
              onChange={handlePicUrlChange}
              className="margins pic-border"
              id="picUrl"
              name="picUrl"
              type="text"
              value={image}
              required
            />
            <br />
            <label htmlFor="post-text">Caption:</label>
            <br />
            <textarea
              onChange={handleTextChange}
              className="text-border"
              id="post-text"
              name="post-text"
              value={text}
              rows="2"
              required
            />
            <br />
            <button
              id="post-btn"
              className="btn btn-primary mt-1"
              type="submit"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Feed({
  getComments,
  users,
  userInfo,
  getUser,
  setUser,
  posts,
  comments,
  likes,
  getLikes,
}) {
  // const [likeCount, setLikeCount] = useState(0);
  const [commentText, setCommentText] = useState("");
  const navigate = useNavigate();
  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleCommentSubmit = async (event, post_id) => {
    event.preventDefault();
    const text = commentText;
    const username = userInfo.username;
    const url = "http://localhost:8010/api/comments/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify({ post_id, username, text }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        setCommentText("");
        getComments();
      }
    } catch (error) {
      console.log("error creating comment: ", error);
    }
  };

  const handleProfileRedirect = async (user) => {
    await getUser(user.username);
    setUser(user);
    if (user) {
      navigate(`/profiles/${user.username}`);
    }
  };

  const handleUnLikeClick = async (event, like_id) => {
    event.preventDefault();
    const url = `http://localhost:8010/api/likes/${like_id}`;
    const fetchConfig = {
      method: "delete",
      credentials: "include",
    };

    try {
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        getLikes();
      }
    } catch (error) {
      console.log("error could not delete like: ", error);
    }
  };

  const handleLikeClick = async (event, post_id) => {
    event.preventDefault();
    const username = userInfo.username;
    const url = "http://localhost:8010/api/likes";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify({ post_id, username }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        getLikes();
      }
    } catch (error) {
      console.log("error creating like: ", error);
    }
  };

  return (
    <>
      {posts.map((post) => {
        const user = users.find((user) => {
          return user.username === post.username;
        });
        const postComments = comments.filter((comment) => {
          return comment.post_id === post.id;
        });
        const isLiked = likes.find((like) => {
          return (
            like.post_id === post.id && like.username === userInfo.username
          );
        });

        return (
          <div key={post.id} id="feed-margins" className="card">
            <div id="post-body" className="card-body">
              <div className="row">
                <div className="col-2">
                  <img
                    onClick={() => handleProfileRedirect(user)}
                    id="post-profile-img"
                    className="ms-4"
                    src={user.profile_picture}
                    alt="post profile"
                  />
                </div>
                <div id="display-name-container" className="col">
                  <h5 id="post-user-displayname" className="card-title">
                    {user.display_name}
                  </h5>
                  <p id="post-comment-text" className="card-text">
                    {post.text}
                  </p>
                </div>
                <div className="col-1">
                  {isLiked === undefined && (
                    <button
                      onClick={(event) => handleLikeClick(event, post.id)}
                      id="like-button"
                      type="button"
                      className="btn btn-danger"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-heart"
                        viewBox="0 0 16 16"
                      >
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                      </svg>
                    </button>
                  )}
                  {isLiked !== undefined && (
                    <button
                      onClick={(event) => handleUnLikeClick(event, isLiked.id)}
                      id="like-button"
                      type="button"
                      className="btn btn-danger"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-heart-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                        ></path>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
            <img
              src={post.image}
              className="card-img-top max-height"
              alt="post"
            />
            <div id="post-comment-body" className="card-body">
              <div className="card comment-form">
                <div id="comment-form-body" className="card-body">
                  <form
                    onSubmit={(event) => handleCommentSubmit(event, post.id)}
                  >
                    <label htmlFor="comment-text">Comment:</label>
                    <br />
                    <textarea
                      onChange={handleCommentChange}
                      id="comment-text"
                      name="comment-text"
                      value={commentText}
                      rows="2"
                      required
                    />
                    <button
                      id="comment-btn"
                      className="btn btn-primary bg-pastel-purp"
                      type="submit"
                    >
                      Post
                    </button>
                  </form>
                </div>
              </div>
              <h6 className="mt-2">Comments</h6>
              {postComments.map((comment) => {
                const commentUser = users.find((user) => {
                  return user.username === comment.username;
                });
                return (
                  <div key={comment.id} id="comment-card" className="card">
                    <div id="comment" className="card-body">
                      <div className="row">
                        <div className="col-2 text-center">
                          <img
                            id="commenter-img"
                            src={commentUser.profile_picture}
                            alt="comment user"
                          />
                        </div>
                        <div className="col">
                          <h6 className="comment-margin">
                            {commentUser.display_name}
                          </h6>
                          <p className="card-text ms-3 bottom-mar">
                            {comment.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}

function MainPage({
  getComments,
  getPosts,
  posts,
  userInfo,
  users,
  getUser,
  setUser,
  connections,
  comments,
  getLikes,
  likes,
}) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (userInfo) {
      setIsLoading(false);
    }
  }, [userInfo]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return;
  }

  return (
    <div className="container">
      <MyProfileSidebar
        connections={connections}
        posts={posts}
        userInfo={userInfo}
      />
      <div
        id="feed-container"
        className="container d-flex flex-column justify-content-center align-items-center bg-light-purp"
      >
        {/* CREATE POST */}
        <CreatePost userInfo={userInfo} getPosts={getPosts} />
        {/* FEED */}
        <Feed
          getUser={getUser}
          setUser={setUser}
          getLikes={getLikes}
          likes={likes}
          getComments={getComments}
          users={users}
          userInfo={userInfo}
          posts={posts}
          comments={comments}
        />
      </div>
    </div>
  );
}
export default MainPage;
