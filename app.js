require('dotenv')
  .config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const limiter = require('./middlewares/rateLimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/notFoundError');

const {
  PORT,
  DB_URL,
} = require('./utils/config');

const app = express();

app.use(limiter);

app.use(requestLogger);

app.use(helmet);

app.use(require('./middlewares/cors'));

app.use(require('./routes/index'));

app.use((req, res, next) => next(new NotFoundError('not found')));

app.use(errorLogger);

app.use(errors());

app.use(require('./middlewares/error'));

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(DB_URL, options)
  .then(() => {
    console.log(`Connected to database ${DB_URL}`);
    app.listen(PORT, () => {
      console.log(`App has been started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Unable to connect to the server. Please start the server. Error:', err);
  });
