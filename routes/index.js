const router = require('express')
  .Router();
const bodyParser = require('body-parser');
const {
  celebrate,
  Joi
} = require('celebrate');
const {
  login,
  createUser
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server is about to crash...');
  }, 0);
});
router.post('/signin', celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required()
        .min(7)
    })
}), login);
router.post('/signup', celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required()
        .min(7)
    })
}), createUser);
router.use(auth);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

module.exports = router;
