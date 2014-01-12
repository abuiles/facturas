import Application from 'app';
import Router from 'config/router';

var App;

module('Acceptances - Todos', {
  setup: function(){
    App = startApp();
  },

  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('todos renders', function(){
  visit('/').then(function(){
    ok(exists('#client-link'), 'find link to client');
  });
});
