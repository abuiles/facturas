import ClientsIndexRoute from 'app/routes/clients/index';

var route, store;

module('Unit - ClientsIndexRoute', {
  setup: function(){
    store = {};

    route = ClientsIndexRoute.create({
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
