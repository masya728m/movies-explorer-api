const {
  PORT = 3000,
  JWT_SECRET = 'dev-secret-key',
  DB_URL = 'mongodb://127.0.0.1:27017/moviesdb',
} = process.env;

module.exports = {
  JWT_SECRET,
  PORT,
  DB_URL,
};
