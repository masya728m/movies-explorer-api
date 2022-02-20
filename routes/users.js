const router = require('express')
  .Router();
const {
  celebrate,
  Joi,
} = require('celebrate');
const {
  getUser,
  updateUserProfile,
} = require('../controllers/users');

router.get('/me', getUser);
router.patch('/me', celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .required()
        .min(2),
      email: Joi.string()
        .required()
        .email(),
    }),
}), updateUserProfile);

module.exports = router;
