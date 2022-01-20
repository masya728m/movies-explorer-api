const validator = require('validator');
const InvalidDataError = require('../errors/invalidDataError');

module.exports.validateUrl = (fieldName) => (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new InvalidDataError(`Failed to validate ${fieldName} field`);
  }
  return value;
};
