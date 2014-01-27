Ember.Handlebars.registerBoundHelper('from-now', function(date) {
  return moment(date).fromNow();
});
