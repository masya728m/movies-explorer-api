const winston = require('winston');
const expressWinston = require('express-winston');

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: 'request.log',
      maxsize: 10000000, // 10MB
      maxFiles: 10
    })
  ],
  format: winston.format.json()
});

const errorLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: 'error.log',
      maxsize: 10000000, // 10MB
      maxFiles: 10
    })
  ],
  format: winston.format.json()
});

module.exports = {
  requestLogger,
  errorLogger
};
