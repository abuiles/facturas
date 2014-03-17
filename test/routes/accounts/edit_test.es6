import AccountsEditRoute from 'app/routes/accounts/edit';

var route, store;

module('Unit - AccountsEditRoute', {
  setup: function(){
    store = {};

    route = AccountsEditRoute.create({
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
