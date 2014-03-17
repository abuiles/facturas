import AccountsIndexRoute from 'app/routes/accounts/index';

var route, store;

module('Unit - AccountsIndexRoute', {
  setup: function(){
    store = {};

    route = AccountsIndexRoute.create({
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
