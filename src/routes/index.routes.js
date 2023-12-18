/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
const express = require('express');
const reportRouter = require('./report.routes');
const userRouter = require('./user.routes');
const authRouter = require('./auth.routes');
const auth = require('../middleware/auth.midleware');

const app = express();

app.use('/auth', authRouter);

app.use('/user', auth, userRouter);

// app.use('/tmp', express.static(path.join(__dirname, './assets')));

app.use('/', auth, reportRouter);

module.exports = app;
