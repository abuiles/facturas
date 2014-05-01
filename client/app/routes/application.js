export default Ember.Route.extend({
  actions: {
    validSignIn: function() {
      this.transitionTo("dashboard");
    },
    didSignOut: function() {
      this.transitionTo("index");
    }
  }
});
