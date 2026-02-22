module.exports = {
  connect(app) {
    require('./todo.router').connect(app);
  }
};
