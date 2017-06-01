const compression = require('compression');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('./server/config/db');

const db = mongoose.connect(config.db);
mongoose.connection.on('connected', () => {
  console.log(`Connected to database ${config.db}`);
});
mongoose.connection.on('error', (err) => {
  console.log(`Database error: ${err}`);
});
mongoose.Promise = global.Promise

const app = express();
const users = require('./server/routes/users');
const todos = require('./server/routes/todos');
const port = process.env.PORT || 3000;

app.use(compression());
app.use(cors());
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./server/config/passport')(passport);
app.use('/users', users);
app.use('/todos', todos);

app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

const listen = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = {
  listen: listen
};