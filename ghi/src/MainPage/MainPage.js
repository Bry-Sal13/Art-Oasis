import React from "react";

// async handlePostLike = (event) {
//   onSubmit(event.target.value);
// };

// const handlePostComment = (event) => {
//   onSubmit(event.target.value);
// };

function MainPage() {
  return (
    <div className="mainpage">
      {post.map((post) => (
        <posts
          key={post.id}
          profilePic={post.data.profilePic}
          username={post.data.username}
          image={post.data.image}
        />
      ))}
    </div>
  );
}
export default MainPage;
