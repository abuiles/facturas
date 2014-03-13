export default Ember.Route.extend({
  model: function(){
    return ic.ajax.request('/api/v1/dashboard');
  }
});
