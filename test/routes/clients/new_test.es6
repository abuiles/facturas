import ClientsNewRoute from 'app/routes/clients/new';

var route, store;

module('Unit - ClientsNewRoute', {
  setup: function(){
    store = {};

    route = ClientsNewRoute.create({
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
