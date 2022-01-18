const Movie = require('../models/movie');
const InvalidDataError = require('../errors/invalidDataError');
const ConflictError = require('../errors/conflictError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner
  })
    .then(() => res.send(req.body))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new InvalidDataError('Invalid data'));
      }
      if (err.code === 11000) {
        return next(new ConflictError(`movie ${req.body.movieId} already exists!`));
      }
      return next(err);
    });
};

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({owner})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const {movieId} = req.params;
  const owner = req.user._id;
  Movie.findById(movieId)
    .orFail(() => next(new NotFoundError('no such movie')))
    .then((movie) => {
      if (!movie.owner.equals(owner))
        return next(new ForbiddenError('Attempt to delete movie created by someone else'));
      return movie.remove()
        .then(() => res.send({message: 'Movie has been successfully deleted'}));
    })
    .catch(next);
};
