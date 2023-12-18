/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
// const PORT = process.env.PORT || 5000;
const PORT = 5000;

app.use(express.json());

const cors = require('cors');

// Express is for building the Rest apis
// cookie-session helps to stores the session data on the client within a cookie without requiring any database/resources on the server side
// cors provides Express middleware to enable CORS

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const cookieParser = require('cookie-parser');
const sessions = require('express-session');

app.use(express.json());
app.use(cookieParser());

const thrtyMinutes = 1000 * 60 * 30;
app.use(sessions({
  resave: false,
  secret: 'thisismysecrctekeyfhrgfgrfrty84fwir1987',
  saveUninitialized: true,
  cookie: {
    sameSite: true,
    maxAge: thrtyMinutes,
  },
}));

app.use('/tmp/:file', async (req, res) => {
  const { file } = req.params;
  res.sendFile(`../../../../../tmp/${file}`);
});

const routes = require('./routes/index.routes');

app.use('/', routes);

app.use((req, res) => {
  res.send('Page is not found!!');
});

app.listen(PORT, () => {
  console.log(`Express API running in port ${PORT}`);
});
