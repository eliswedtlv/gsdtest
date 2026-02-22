const { negative } = require('../helpers/response');

module.exports = (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json(negative('server', err.message || 'Internal error'));
};
