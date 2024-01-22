import PropTypes from "prop-types";
import { useState } from "react";
import { commentOnPost, likePost } from "../../utils/posts";

function formatTimestamp(timestamp) {
  // Create a Date object from the timestamp
  const date = new Date(timestamp);

  // Options for toLocaleTimeString() to display time in a readable format
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Use 24-hour time
    timeZoneName: "short", // Display the time zone abbreviation
  };

  // The toLocaleTimeString method can be given a locale and options for formatting
  const timeString = date.toLocaleTimeString("en-US", options);

  return timeString;
}

const Post = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState(post.likes.length);

  const handleLike = async () => {
    try {
      setLoading(true);

      const response = await likePost(post.id, localStorage.getItem("token"));

      if (response) {
        setLikes((likes) => likes + 1);
      }
    } catch (error) {
      console.error("Error occurred while liking the post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-5 flex gap-5 sm:gap-6 py-5 px-5 sm:px-6">
      <div className="w-full">
        <div className="flex justify-between w-full">
          <div>
            <p>
              Created By: <span>{post.author}</span>
            </p>
          </div>
          <div>
            <p>
              Created At: <span>{formatTimestamp(post.created_at)}</span>
            </p>
          </div>
        </div>
        <h3 className="text-xl leading-6 font-medium text-slate-950">
          {post.title}
        </h3>
        <h4 className="text-lg leading-6 font-medium text-slate-950">
          {post.body}
        </h4>
        <button
          disabled={loading}
          onClick={handleLike}
          className="mt-1 max-w-2xl text-sm text-slate-500 bg-slate-200 w-fit px-2 py-1 rounded-md cursor-pointer disabled:opacity-70">
          <span className="text-indigo-600">Likes:</span>{" "}
          <span className="text-indigo-800">{likes}</span>
        </button>
        <Comments comments={post.comments} postId={post.id} />
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;

const Comments = ({ comments, postId }) => {
  const [loading, setLoading] = useState(false);
  const [commentsArray, setCommentsArray] = useState(comments);

  const [commentBody, setCommentBody] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await commentOnPost(
        postId,
        commentBody,
        localStorage.getItem("token")
      );

      if (response) {
        console.log(response);
        setCommentsArray((prev) => [...prev, response]);
      }
    } catch (error) {
      console.error("Error occurred while liking the post:", error);
    } finally {
      setLoading(false);
      setCommentBody("");
    }
  };

  return (
    <div className="mt-5">
      <div>
        <h3 className="text-base leading-6 font-medium text-slate-950">
          Add Comment
        </h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            placeholder="Write a comment..."
            className="mt-1 mb-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
          />
          <button
            type="submit"
            disabled={loading}
            className="focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm px-3 p-2 rounded-md bg-indigo-500 text-white disabled:opacity-70">
            Add Comment
          </button>
        </form>
      </div>
      {commentsArray.length > 0 && (
        <>
          <h3 className="text-base mt-5 leading-6 font-medium text-slate-950">
            Comments
          </h3>
          <div className="mt-5">
            {commentsArray.map((comment) => (
              <div
                key={comment.id}
                className="flex gap-5 sm:gap-6 py-2 px-5 sm:px-6 border-l-2 border-indigo-400">
                <div className="w-full">
                  <div className="flex justify-between w-full">
                    <div>
                      <p className="text-sm">
                        Created By: <span>{comment.author}</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm">
                        Created At:{" "}
                        <span>{formatTimestamp(comment.created_at)}</span>
                      </p>
                    </div>
                  </div>
                  <h3 className="text-sm leading-6 font-medium text-slate-950">
                    {comment.body}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
