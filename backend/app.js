const express = require('express');
const path = require('path');
const passport = require('passport');
const user = require('./src/routes/user.route');

// import models from './src/models/index';

const app = express();

app.use('/user', user);

app.listen(8000, () => {
    console.log('LEZGETIT');
});