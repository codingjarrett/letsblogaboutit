const express = require('express');
const session = require('express-session');
const handlebars = require('express-handlebars');
const path = require('path');
const dotenv = require('dotenv');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Import controllers
const authController = require('./controllers/auth');
const postController = require('./controllers/posts');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set up session store
const sessionStore = new SequelizeStore({
  db: sequelize,
});

// Set up session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 86400000 },
  })
);

// Set up Handlebars as template engine
app.engine(
  'handlebars',
  handlebars({
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'main',
  })
);
app.set('view engine', 'handlebars');

// Set up static assets
app.use(express.static(path.join(__dirname, 'public')));

// Set up request body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up routes
app.use('/auth', authController);
app.use('/posts', postController);

// Set up error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('error', { error: err });
});

// Sync database and start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
