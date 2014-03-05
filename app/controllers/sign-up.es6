var SignupController = Ember.Controller.extend({
  email: null,
  password: null,
  firstName: null,
  lastName: null,
  actions: {
    signUp: function() {
      var _this = this;
      var user = {
        email: this.get('email'),
        password: this.get('password'),
        password_confirmation: this.get('password'),
      };
      ic.ajax.request('/users', {
        type: "POST",
        data: {user: user},
        dataType: 'json'
      }).then(function(response){
        _this.get("auth").setupSession(response);
        _this.transitionTo('dashboard');
      });
    }
  }
});

export default SignupController;
