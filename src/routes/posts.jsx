import { useEffect, useState } from "react";
import { getPosts } from "../utils/posts";
import Post from "../components/card/post";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      getPosts().then(({ data }) => {
        console.log(data);
        if (data) {
          setPosts(data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="max-w-7xl px-[5%] mx-auto">
      <div className="mt-10">
        <h1 className="text-base text-indigo-400 underline underline-offset-1">
          Posts
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

export default Posts;
