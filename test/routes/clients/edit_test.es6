import ClientsEditRoute from 'app/routes/clients/edit';

var route, store;

module('Unit - ClientsEditRoute', {
  setup: function(){
    store = {};

    route = ClientsEditRoute.create({
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
