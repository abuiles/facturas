import ClientsShowRoute from 'app/routes/clients/show';

var route, store;

module('Unit - ClientsShowRoute', {
  setup: function(){
    store = {};

    route = ClientsShowRoute.create({
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
