var ClientsIndex = Ember.ArrayController.extend({
  searchResults: null,
  selected: null,
  searchText: '',
  filteredClients: function() {
    var searchText = this.get('searchText');

    if(searchText.length === 0) {
      return this.get('model');
    }

    var searchResults = this.get('model').filter(function(client) {
      return !!client.get('fullName').match(new RegExp(searchText, 'i'));
    }).sort(function(client1, client2) {
      return Ember.compare(client1.get('lastName'), client2.get('lastName'));
    });
    return searchResults;
  }.property('searchText')

});

export default ClientsIndex;
