const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const createPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    res.status(200).json(createPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/', async (req, res) => {
  try {
    const updatePost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: { id: req.body.post_id }
      }
    );

    res.status(200).json(updatePost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: { id: req.params.id }
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    };

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/comment', withAuth, async (req, res) => {
  console.log(req.body.commentText, req.session.user_id, req.body.post_id)

  try {
    const createComment = await Comment.create({
      commentText: req.body.commentText,
      post_id: req.body.post_id,
      user_id: req.session.user_id
    });

    console.log(req.body.commentText, req.session.user_id, req.body.post_id)

    res.status(200).json(createComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
