const post_id = document.querySelector(".edit-post").getAttribute('data-id');

const updatePost = async (event) => {
  event.preventDefault();

  const title = document.querySelector(".post-title").value.trim();
  const content = document.querySelector(".post-content").value.trim();

  if (title && content && post_id) {
    const response = await fetch(`/api/posts/`, {
      method: 'PUT',
      body: JSON.stringify({ post_id, title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/post/${post_id}`);
    } else {
      alert('Failed to update post');
    }
  }
};

document
  .querySelector('.update')
  .addEventListener('click', updatePost);


const deletePost = async (event) => {
  if (post_id) {

    const response = await fetch(`/api/posts/${post_id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

document
  .querySelector('.delete')
  .addEventListener('click', deletePost);