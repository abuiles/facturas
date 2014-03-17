import AccountsNewRoute from 'app/routes/accounts/new';

var route, store;

module('Unit - AccountsNewRoute', {
  setup: function(){
    store = {};

    route = AccountsNewRoute.create({
      store: store
    });
  },
  teardown: function(){
    Ember.run(route, 'destroy');
  }
});

test('it exist', function(){
  expect(2);

  ok(route);
  ok(route instanceof Ember.Route);
});
