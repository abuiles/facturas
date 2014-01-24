var App;

module('Integration - Clients', {
  setup: function(){
    App = startApp();

    var response =  {
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

    $.mockjax({
      url: '/api/v1/clients',
      responseText: response
    });
  },

  teardown: function(){
    Ember.run(App, 'destroy');
  }
});


test("has a list of clients", function() {
  expect(1);

  visit("/clients");

  andThen(function(){
    equal(find(".client-row").length, 2, "Has a row for every client");
  });
});
