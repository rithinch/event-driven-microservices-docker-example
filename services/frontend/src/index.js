const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
const Mongoose = require('mongoose');
const config = require('./environment/config');

// Init Database Connection
Mongoose.connect(config.db.uri, { user: config.db.username, pass: config.db.password });
Mongoose.connection.on('error', console.error);

const Articles = require('./models/article.model');

app.get('/', (req, res) => {
  Articles.find({})
    .then(articles => res.render('/server/src/views/index', { articles }))
    .catch(err => res.status(404).json({ msg: 'No items found', err: err }));
});

const port = 3005;

app.listen(port, () => console.log('Server running...'));
