export async function createPost(postTitle, postBody, token) {
  const url = `https://kaushikpattnaik200030.pythonanywhere.com/api/posts/`;

  const postData = {
    title: postTitle,
    body: postBody,
  };
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      method: "POST",
      body: JSON.stringify(postData),
    });

    const data = await response.json();

    console.log("createPost", data);

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getPosts() {
  const url = `https://kaushikpattnaik200030.pythonanywhere.com/api/posts/`;
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    const data = await response.json();

    console.log("getPosts", data);

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getPostsByUser(userId) {
  const url =
    `https://kaushikpattnaik200030.pythonanywhere.com/api/posts/` +
    "?user=" +
    userId;

  console.log(url);
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    const data = await response.json();

    console.log("getPostsByUser", data);

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function commentOnPost(postId, commentBody, token) {
  const url = `https://kaushikpattnaik200030.pythonanywhere.com/api/comments/`;

  const commentData = {
    post: postId,
    body: commentBody,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(commentData),
    });
    const data = await response.json();

    console.log("commentOnPost", data);

    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function likePost(postId, token) {
  const url = `https://kaushikpattnaik200030.pythonanywhere.com/api/likes/`;

  const likeData = {
    post: postId,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(likeData),
    });
    const data = await response.json();

    console.log("likePost", data);

    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}
