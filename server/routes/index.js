module.exports = function(app) {
  app.use('/api/auth', require('./auth'));
  app.use('/api/songs', require('./songs'));
  app.use('/api/performance', require('./performance'));
};