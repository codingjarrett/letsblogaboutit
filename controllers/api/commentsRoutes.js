const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
    const commentData = await Comment.findAll({
        include: [{ model: User}],
    });
    res.status(200).json(commentData);
    } catch (err) {
    res.status(500).json(err);
    }
});

router.get('/:id',async (req, res) => {
    try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['name'] },
        {
          model: Post,
          attributes: ['id','description','post_id','user_id',],
          include: { model: User, attributes: ['username'] },
        },
      ],
    });

    if (!commentData) {
        res.status(404).json({ message: 'No post found with that id.' });
        return;
    }

    res.status(200).json(commentData);
    } catch (err) {
    res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
