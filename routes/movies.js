const router = require('express')
  .Router();
const validator = require('validator');
const {
  celebrate,
  Joi,
} = require('celebrate');
const {
  createMovie,
  deleteMovie,
  getMovies,
} = require('../controllers/movies');
const InvalidDataError = require('../errors/invalidDataError');

const validateUrl = (fieldName) => (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new InvalidDataError(`Failed to validate ${fieldName} field`);
  }
  return value;
};

router.get('/', getMovies);
router.delete('/:movieId', celebrate({
  params: Joi.object()
    .keys({
      movieId: Joi.string()
        .length(24)
        .hex(),
    }),
}), deleteMovie);
router.post('/', celebrate({
  body: Joi.object()
    .keys({
      country: Joi.string()
        .required(),
      director: Joi.string()
        .required(),
      duration: Joi.number()
        .required(),
      year: Joi.date()
        .required(),
      description: Joi.string()
        .required(),
      image: Joi.string()
        .required()
        .custom(validateUrl('image')),
      trailer: Joi.string()
        .required()
        .custom(validateUrl('trailer')),
      thumbnail: Joi.string()
        .required()
        .custom(validateUrl('thumbnail')),
      movieId: Joi.number()
        .required(),
      nameRU: Joi.string()
        .required(),
      nameEN: Joi.string()
        .required(),
    }),
}), createMovie);
module.exports = router;
