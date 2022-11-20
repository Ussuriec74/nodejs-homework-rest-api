const { auth } = require('./auth');
const { upload } = require('./upload');
const { validateRequest } = require('./validateRequest');

module.exports = {
  auth,
  upload,
  validateRequest,
};