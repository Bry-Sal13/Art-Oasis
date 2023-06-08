import React, { useEffect, useState } from "react";
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
        <div className="d-flex justify-content-between align-items-center mt-4 px-4">
          <div className="stats">
            <h6 className="mb-0">Following</h6>
            <span>{following}</span>
          </div>
          <div className="stats">
            <h6 className="mb-0">Followers</h6>
            <span>{followers}</span>
          </div>
          <div className="stats">
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
      console.log("error updating user: ", error);
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
            <button id="post-btn" className="btn btn-primary mt-1" type="submit">
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Feed({ getComments, users, userInfo, posts, comments }) {
  // const [likeCount, setLikeCount] = useState(0);
  const [commentText, setCommentText] = useState("");

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleCommentSubmit = async (event, post_id) => {
    event.preventDefault();
    const text = commentText;
    const username = userInfo.username;
    console.log("id", post_id);
    console.log("text", text);
    console.log("username", username);
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
      console.log("error updating user: ", error);
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
        return (
          <div key={post.id} id="feed-margins" className="card">
            <div id="post-body" className="card-body">
              <h5 className="card-title">{user.display_name}</h5>
              <p className="card-text">{post.text}</p>
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
  connections,
  comments,
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
