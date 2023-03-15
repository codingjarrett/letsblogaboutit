const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// define models
db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);

// define associations between models
db.Post.belongsTo(db.User);
db.Comment.belongsTo(db.User);
db.Comment.belongsTo(db.Post);
db.Post.hasMany(db.Comment);

module.exports = db;