import React, { useRef, useState } from "react";

import "./User.css";

const token =
  "8c3824f517047bdfd583909429ffae2193fad72f88095be1c4c92fe27aa8076d";

const User = () => {
  const [posts, setUserPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [addNewPostForm, setAddNewPostForm] = useState(false);
  const [addNewCommentForm, setAddNewCommentForm] = useState(false);

  const [id, setID] = useState("");

  const titleRef = useRef("");
  const descriptionRef = useRef("");
  const userIDRef = useRef("");
  const newCommentRef = useRef("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await fetch(
      "https://gorest.co.in/public/v2/users/" + id + "/posts",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((data) => data.json());
    console.log(result);

    setUserPosts(result);
    setIsLoading(false);
  };

  const toggleAddNewPostHandler = () => {
    setAddNewPostForm(true);
  };

  const addNewPostHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await fetch(
      "https://gorest.co.in/public/v2/users/" +
        userIDRef.current.value +
        "/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: titleRef.current.value,
          body: descriptionRef.current.value,
        }),
      }
    ).then((data) => data.json());

    setIsLoading(false);
  };

  const loadComments = async (postID) => {
    const result = await fetch(
      "https://gorest.co.in/public/v2/posts/" + postID + "/comments",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((data) => data.json());

    setComments(result);
  };

  const addNewCommentHandler = async (e, postID) => {
    e.preventDefault();
    setAddNewCommentForm(true);

    const res = await fetch("https://gorest.co.in/public/v2/users/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => data.json());

    const commentUser = res;
    console.log(commentUser);
    console.log(newCommentRef.current.value);

    const result = await fetch(
      "https://gorest.co.in/public/v2/posts/" + postID + "/comments",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: commentUser.name,
          email: commentUser.email,
          body: newCommentRef.current.value,
        }),
      }
    ).then((data) => data.json());
    loadComments(postID);
  };

  return (
    <>
      {!addNewPostForm && (
        <>
          <form onSubmit={submitHandler} className="form-container">
            <div className="form-group">
              <label htmlFor="example1">Users ID</label>
              <input
                type="text"
                className="form-control"
                id="example1"
                aria-describedby="idHelp"
                placeholder="Enter user's ID"
                autoComplete="off"
                value={id}
                onChange={(e) => setID(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
          {isLoading && <p>Loading...</p>}
          {!isLoading && (
            <div className="mt-4">
              <button
                type="button"
                className="btn btn-success mb-4"
                onClick={toggleAddNewPostHandler}
              >
                Add post for this user
              </button>
              {posts.map((post, i) => {
                return (
                  <div className="card mb-4" key={i}>
                    <div className="card-body">
                      <h5 className="card-title">{post.title}</h5>
                      <p className="card-text">{post.body}</p>
                      <div className="row">
                        <div className="col-6">
                          <button
                            className="btn btn-warning my-2"
                            onClick={() => loadComments(post.id)}
                          >
                            View Comments
                          </button>
                        </div>
                        <div className="col-6">
                          <button
                            className="btn btn-success my-2"
                            onClick={() => setAddNewCommentForm(true)}
                          >
                            Add Comment
                          </button>
                        </div>
                      </div>
                      {comments.map((comment, i) => {
                        return <p key={i}>{comment.body}</p>;
                      })}
                      {addNewCommentForm && (
                        <form
                          onSubmit={(e) => addNewCommentHandler(e, post.id)}
                          className="form-container"
                        >
                          <div className="form-group">
                            <textarea
                              className="form-control"
                              id="post-comment"
                              aria-describedby="postcommentHelp"
                              placeholder="Enter comment"
                              ref={newCommentRef}
                            />
                          </div>
                          <button
                            type="submit"
                            className="btn btn-primary my-2"
                          >
                            Submit
                          </button>
                          <button
                            className="btn btn-danger mx-2"
                            onClick={() => setAddNewCommentForm(false)}
                          >
                            Cancel
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                );
              })}
              {posts.length === 0 && (
                <div className="card mb-4">
                  <div className="card-body">
                    <p>There are no posts</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
      {addNewPostForm && (
        <form onSubmit={addNewPostHandler} className="form-container">
          <h2>Add Post</h2>
          <div className="form-group">
            <label htmlFor="post-user">User's ID</label>
            <input
              type="text"
              className="form-control"
              id="post-user"
              aria-describedby="postuserIDHelp"
              placeholder="Enter user ID"
              ref={userIDRef}
            />
          </div>
          <div className="form-group">
            <label htmlFor="post-title">Post's Title</label>
            <input
              type="text"
              className="form-control"
              id="post-title"
              aria-describedby="posttitleHelp"
              placeholder="Enter post's title"
              ref={titleRef}
            />
          </div>
          <div className="form-group">
            <label htmlFor="post-desc">Post's Description</label>
            <textarea
              rows={8}
              className="form-control"
              id="post-desc"
              aria-describedby="postdescHelp"
              placeholder="Enter post's description"
              ref={descriptionRef}
            />
          </div>
          <button type="submit" className="btn btn-primary my-2">
            Submit
          </button>
          <button
            className="btn btn-danger mx-2"
            onClick={() => setAddNewPostForm(false)}
          >
            Cancel
          </button>
        </form>
      )}
    </>
  );
};

export default User;
