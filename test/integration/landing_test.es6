var App;

module('Integration - Landing', {
  setup: function(){
    App = startApp();
  },

  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('has links', function(){
  expect(2);

  visit('/').then(function(){
    ok(exists('.clients-link'), 'find link to clients');
    ok(exists('.new-client-link'), 'find link to new client');
  });
});
