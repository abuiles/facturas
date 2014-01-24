var App;

module('Integration - Landing', {
  setup: function(){
    App = startApp();
  },

  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('landing renders', function(){
  visit('/').then(function(){
    ok(exists('#client-link'), 'find link to client');
  });
});
