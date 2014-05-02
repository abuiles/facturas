export default {
  name: 'csrf',
  initialize: function(container, app) {
    app.inject('route', 'csrf', 'service:csrf');
    app.inject('controller', 'csrf', 'service:csrf');
  }
};
