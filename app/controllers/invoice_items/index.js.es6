export default Ember.ArrayController.extend({
  sortProperties: ['createdAt'],
  sortAscending: false,
  total: function(){
    return this.get('model').mapBy('amount').reduce(
      function(previousValue, item){ return previousValue + item; },
      0
    );
  }.property('model.[]')
});
