const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [{ model: User }],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [User, { model: Comment, include: [User] }],
    });

    const post = postData.get({ plain: true });

    if (req.session.logged_in) {
      const user_id = req.session.user_id;

      res.render('blogPost', {
        ...post,
        user_id,
        logged_in: req.session.logged_in
      });
    } else {
      res.render("blogPost", {
        ...post,
      });
    };
  } catch (err) {
    res.status(500).json(err);
  };
});

router.get('/post/:id/deleteUpdate', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [User, { model: Comment, include: [User] }],
    });

    const post = postData.get({ plain: true });

    if (post.user_id === req.session.user_id) {
      res.render('deleteUpdate', {
        ...post,
        logged_in: req.session.logged_in
      })
    } else {
      res.redirect("/login");
    };
  } catch (err) {
    res.status(500).json(err);
  };
});



// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {
        exclude: ['password']
      },
      include: [
        {
          model: Post, Comment
        }
      ],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('loginSignup');
});

module.exports = router;
