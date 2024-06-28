const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./auth');
const users = require('./users');

const app = express();
app.use(bodyParser.json());

app.use('/auth', auth);
app.use('/users', users);

app.listen(4000, () => console.log('Server running on port 4000'));