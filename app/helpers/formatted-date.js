Ember.Handlebars.registerBoundHelper('formatted-date', function(date) {
  return moment(date).format('LL');
});
