const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { check, validationResult } = require('express-validator');
const { isLoggedIn } = require('../middleware/auth');

// Render the login form
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// Handle the login form submission
router.post(
  '/login',
  [
    check('email')
      .isEmail()
      .withMessage('Please provide a valid email address.'),
    check('password')
      .notEmpty()
      .withMessage('Please provide your password.'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      req.flash('errorMessages', errorMessages);
      res.redirect('/auth/login');
      return;
    }

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email: email } });

      if (!user) {
        req.flash('errorMessages', 'Invalid email or password.');
        res.redirect('/auth/login');
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        req.flash('errorMessages', 'Invalid email or password.');
        res.redirect('/auth/login');
        return;
      }

      req.session.user = user;
      res.redirect('/');
    } catch (err) {
      console.error(err);
      req.flash('errorMessages', 'An error occurred while logging in. Please try again later.');
      res.redirect('/auth/login');
    }
  }
);

// Render the registration form
router.get('/register', (req, res) => {
  res.render('auth/register');
});

// Handle the registration form submission
router.post(
  '/register',
  [
    check('email')
      .isEmail()
      .withMessage('Please provide a valid email address.')
      .custom(async (email) => {
        const existingUser = await User.findOne({ where: { email: email } });
        if (existingUser) {
          throw new Error('A user with this email address already exists.');
        }
      }),
    check('password')
      .notEmpty()
      .withMessage('Please provide a password.')
      .isLength({ min: 6 })
      .withMessage('Your password must be at least 6 characters long.'),
    check('confirmPassword')
      .custom((confirmPassword, { req }) => {
        if (confirmPassword !== req.body.password) {
          throw new Error('Your passwords do not match.');
        }
        return true;
      }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      req.flash('errorMessages', errorMessages);
      res.redirect('/auth/register');
      return;
    }

    try {
      const { email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        email: email,
        password: hashedPassword,
      });

      req.session.user = newUser;
      res.redirect('/');
    } catch (err) {
      console.error(err);
      req.flash('errorMessages', 'An error occurred while registering. Please try again later.');
      res.redirect('/auth/register');
    }
  }
);

// Handle logging out