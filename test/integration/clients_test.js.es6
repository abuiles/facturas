var App, response;

module('Integration - Clients', {
  setup: function(){
    fakehr.start();

    App = startApp();
  },

  teardown: function(){
    Ember.run(App, 'destroy');
    fakehr.reset();

  }
});

response =  {
  clients: [
    {
      id: 1,
      first_name: "Tyrion",
      last_name: 'Lannister',
      phone: '1234567',
      email: 'tyrion@lannisport.com'
    },
    {
      id: 2,
      first_name: "Tywin ",
      last_name: 'Lannister',
      phone: '1234563',
      email: 't@lannisport.com'
    }
  ]
};

test("has a list of clients", function() {
  expect(1);

  visit("/clients").httpRespond("get", "/api/v1/clients", response);

  andThen(function(){
    equal(find(".client-row").length, 2, "Has a row for every client");
  });
});
