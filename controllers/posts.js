const { Post, User } = require('../models');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ include: User });
    res.render('posts', { posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id, { include: User });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.render('post', { post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createPost = async (req, res) => {
  const { title, body } = req.body;
  const { user } = req.session;
  try {
    const post = await Post.create({ title, body, userId: user.id });
    res.redirect(`/posts/${post.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.title = title;
    post.body = body;
    await post.save();
    res.redirect(`/posts/${id}`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    await post.destroy();
    res.redirect('/posts');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};