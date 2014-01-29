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

  visit("/").click(".clients-link").httpRespond("get", "/api/v1/clients", response);

  andThen(function(){
    equal(find(".client-row").length, 2, "Has a row for every client");
  });
});


test("creating a new client display the new client", function(){
  expect(4);

  var tyrion = {
    id: 1,
    first_name: "Tyrion",
    last_name: 'Lannister',
    phone: '1234567',
    email: 'tyrion@lannisport.com',
    links: { invoice_items: "/api/v1/invoice_items?client_id=1" }
  }

  visit("/").
    click(".new-client-link").
    fillIn(".client-first-name", tyrion.first_name).
    fillIn(".client-last-name", tyrion.last_name).
    fillIn(".client-phone", tyrion.phone).
    fillIn(".client-email", tyrion.email).
    click("button.create")
    .httpRespond("post", "/api/v1/clients", { client: tyrion }, 201)

  andThen(function(){
    equal(find("dl > dd.client-first-name:contains('Tyrion')").length, 1, "Displays the client first name");
    equal(find("dl > dd.client-last-name:contains('Lannister')").length, 1, "Displays the client last name");
    equal(find("dl > dd.client-phone:contains('1234567')").length, 1, "Displays the client phone");
    equal(find("dl > dd.client-email:contains('tyrion@lannisport.com')").length, 1, "Displays the client email");
  });
});
