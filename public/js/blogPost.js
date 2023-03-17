const createComment = async (event) => {
    event.preventDefault();

    const commentText = document.querySelector('.commentText').value.trim();
    const post_id = document.querySelector('.post').getAttribute('data-id');
    console.log(commentText, post_id)

    if (commentText && post_id) {
        const response = await fetch(`/api/posts/comment`, {
            method: 'POST',
            body: JSON.stringify({ commentText, post_id }),
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
    .querySelector('.create-comment')
    .addEventListener('submit', createComment);