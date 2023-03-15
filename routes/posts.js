const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts');

// Route for displaying all posts
router.get('/', postController.getAllPosts);

// Route for displaying a single post by ID
router.get('/:id', postController.getPostById);

// Route for displaying the create post form
router.get('/create', postController.getCreatePostForm);

// Route for creating a new post
router.post('/create', postController.createPost);

// Route for displaying the edit post form
router.get('/:id/edit', postController.getEditPostForm);

// Route for updating a post
router.post('/:id/edit', postController.updatePost);

// Route for deleting a post
router.post('/:id/delete', postController.deletePost);

module.exports = router;