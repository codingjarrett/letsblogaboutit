const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
    const postData = await Post.findAll({
        include: [{ model: User}],
    });
    res.status(200).json(postData);
    } catch (err) {
    res.status(500).json(err);
    }
});

router.get('/:id',async (req, res) => {
    try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Comment,
          attributes: ['id','comment_text','post_id','user_id',],
          
          include: { model: User, attributes: ['username'] },
        },
      ],
    });

    if (!postData) {
        res.status(404).json({ message: 'We could not locate a post with that id.' });
        return;
    }

    res.status(200).json(postData);
    } catch (err) {
    res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'we could not locate a post with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
