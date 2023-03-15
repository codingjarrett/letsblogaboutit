const { User } = require('../models');
const bcrypt = require('bcrypt');

// function to handle user login
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  
  // if user not found
  if (!user) {
    res.status(401).render('login', { message: 'Invalid email or password.' });
    return;
  }
  
  // if password is incorrect
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    res.status(401).render('login', { message: 'Invalid email or password.' });
    return;
  }

  // set user session
  req.session.user = {
    id: user.id,
    email: user.email
  };
  
  // redirect to dashboard
  res.redirect('/dashboard');
};

// function to handle user logout
const logout = (req, res) => {
  // destroy user session
  req.session.destroy();
  
  // redirect to home page
  res.redirect('/');
};

module.exports = {
  login,
  logout
};