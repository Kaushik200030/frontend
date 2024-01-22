import { useEffect, useState } from "react";
import { createPost, getPostsByUser } from "../utils/posts";
import Post from "../components/card/post";
import PropTypes from "prop-types";

const Author = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    try {
      getPostsByUser(JSON.parse(localStorage.getItem("user")).id).then(
        ({ data }) => {
          if (data) {
            setPosts(data);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  const prependNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="max-w-7xl px-[5%] mx-auto">
      <div className="mt-10">
        <h1 className="text-base text-indigo-400 underline underline-offset-1">
          Create Post
        </h1>
      </div>
      <div className="mt-5">
        <PostForm prependNewPost={prependNewPost} />
      </div>
      <div className="mt-10">
        <h1 className="text-base text-indigo-400 underline underline-offset-1">
          My Posts
        </h1>
      </div>
      <div className="mt-5">
        {posts.length > 0
          ? posts.map((post) => <Post key={post.id} post={post} />)
          : "No posts availabel"}
      </div>
    </div>
  );
};

export default Author;

function PostForm({ prependNewPost }) {
  const [loading, setLoading] = useState(false);
  const [postBody, setPostBody] = useState("");
  const [postTitle, setPostTitle] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await createPost(
        postTitle,
        postBody,
        localStorage.getItem("token")
      );

      prependNewPost(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setPostBody("");
      setPostTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-6">
        <div className="col-span-1">
          <label
            htmlFor="postTitle"
            className="block text-sm font-medium text-slate-950">
            Enter Post Title
          </label>
          <input
            type="text"
            name="postTitle"
            id="postTitle"
            autoComplete="postTitle"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
          />
        </div>
        <div className="col-span-1">
          <label
            htmlFor="postTitle"
            className="block text-sm font-medium text-slate-950">
            Enter Post Body
          </label>
          <input
            type="text"
            name="postBody"
            id="postBody"
            autoComplete="postBody"
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
            className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
          />
        </div>
        <div className="col-span-1">
          <button
            disabled={loading}
            type="submit"
            className="focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm px-3 p-2 rounded-md bg-indigo-500 text-white disabled:opacity-70">
            Post
          </button>
        </div>
      </div>
    </form>
  );
}

PostForm.propTypes = {
  prependNewPost: PropTypes.func.isRequired,
};
