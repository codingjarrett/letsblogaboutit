const commentFormHandler = async function (event) {
	event.preventDefault();

	const postId = document.querySelector('.new-comment-form').dataset.postid;

	const desc = document.querySelector('#comment-desc').value.trim();

    if (desc) {
        const response = await fetch(`/api/comments`, {
          method: 'POST',
          body: JSON.stringify({
            postId,
            content
        }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          document.location.reload();
        } else {
          alert('Failed to create comment');
        }
      }
    };




document
	.querySelector('.new-comment-form')
	.addEventListener('submit', commentFormHandler);