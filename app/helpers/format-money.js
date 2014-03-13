Ember.Handlebars.registerBoundHelper('format-money', function(amount) {
  return accounting.formatMoney(amount);
});
