import AccountsShowRoute from 'app/routes/accounts/show';

var route, store;

module('Unit - AccountsShowRoute', {
  setup: function(){
    store = {};

    route = AccountsShowRoute.create({
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
