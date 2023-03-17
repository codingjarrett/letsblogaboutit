const usersPosts = document.querySelector(".usersPosts");
const createPost = document.querySelector(".createPost");

const showCreatePost = () => {
  usersPosts.classList.add("hidden");
  createPost.classList.remove("hidden");
};

document.querySelector(".newPost").addEventListener("click", showCreatePost);

const hideCreatePost = () => {
  usersPosts.classList.remove("hidden");
  createPost.classList.add("hidden");
};

const newPost = async (event) => {
  event.preventDefault();

  const title = document.querySelector(".post-title").value.trim();
  const content = document.querySelector(".post-content").value.trim();

  if (title && content) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      hideCreatePost;
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create post");
    };
  };
};

document
  .querySelector(".new-post")
  .addEventListener("submit", newPost);
  