var define, requireModule, require, requirejs;

(function() {
  var registry = {}, seen = {};

  define = function(name, deps, callback) {
    registry[name] = { deps: deps, callback: callback };
  };

  requirejs = require = requireModule = function(name) {
  requirejs._eak_seen = registry;

    if (seen[name]) { return seen[name]; }
    seen[name] = {};

    if (!registry[name]) {
      throw new Error("Could not find module " + name);
    }

    var mod = registry[name],
        deps = mod.deps,
        callback = mod.callback,
        reified = [],
        exports;

    for (var i=0, l=deps.length; i<l; i++) {
      if (deps[i] === 'exports') {
        reified.push(exports = {});
      } else {
        reified.push(requireModule(resolve(deps[i])));
      }
    }

    var value = callback.apply(this, reified);
    return seen[name] = exports || value;

    function resolve(child) {
      if (child.charAt(0) !== '.') { return child; }
      var parts = child.split("/");
      var parentBase = name.split("/").slice(0, -1);

      for (var i=0, l=parts.length; i<l; i++) {
        var part = parts[i];

        if (part === '..') { parentBase.pop(); }
        else if (part === '.') { continue; }
        else { parentBase.push(part); }
      }

      return parentBase.join("/");
    }
  };
})();
define("ember-devise-simple-auth/configuration",
  ["exports"],
  function(__exports__) {
    "use strict";
    var defaults = {
      signInPath: "/sign-in",
      deviseSignInPath: "/users/sign_in",
      deviseSignOutPath: "/users/sign_out",
      userModelType: "user",
      currentSessionPath: "/sessions/current"
    };

    var getSetting = function(app, setting) {
      var prefixedKey = "deviseSimpleAuth." + setting;
      return app.getWithDefault(prefixedKey, defaults[setting]);
    };

    __exports__.getSetting = getSetting;
  });define("ember-devise-simple-auth/initializers/authenticator",
  ["app/models/authenticator","ember-devise-simple-auth/configuration","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Authenticator = __dependency1__["default"];
    var getSetting = __dependency2__.getSetting;

    var initializer = {
      name: 'authenticator',
      initialize: function(container, app) {
        var signInPath = getSetting(app, "deviseSignInPath"),
            signOutPath = getSetting(app, "deviseSignOutPath"),
            userModelType = getSetting(app, "userModelType"),
            currentSessionPath = getSetting(app, "currentSessionPath");

        var auth = Authenticator.create();

        auth.set("signInPath", signInPath)
            .set("signOutPath", signOutPath)
            .set("userModelType", userModelType)
            .set("currentSessionPath", currentSessionPath);

        container.register("devise-simple-auth:authenticator", auth, {instantiate: false});
        app.inject("route", "authenticator", "devise-simple-auth:authenticator");
        app.inject("controller", "auth", "devise-simple-auth:authenticator");
      }
    };

    __exports__["default"] = initializer;
  });define("ember-devise-simple-auth/initializers/csrf",
  [],
  function() {
    "use strict";
    $(document).on("ajaxComplete", function(event, xhr, settings) {
      var csrf_param = xhr.getResponseHeader('X-CSRF-Param'),
          csrf_token = xhr.getResponseHeader('X-CSRF-Token');

      if (csrf_param) {
        $('meta[name="csrf-param"]').attr('content', csrf_param);
      }
      if (csrf_token) {
        $('meta[name="csrf-token"]').attr('content', csrf_token);
      }
    });
  });define("ember-devise-simple-auth/initializers/session-route",
  ["ember-devise-simple-auth/configuration","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var getSetting = __dependency1__.getSetting;

    var initializer = {
      name: 'session-route',
      initialize: function(container, app) {
        app.Router.map(function() {
          this.route("session", {path: getSetting(app, "signInPath")});
        });
      }
    };

    __exports__["default"] = initializer;
  });define("app/models/authenticator",
  ["exports"],
  function(__exports__) {
    "use strict";
    var Authenticator = Ember.Object.extend({
      email: null,
      password: null,
      currentUser: null,
      isSignedIn: false,
      isValid: Ember.computed.not("isInvalid"),
      isInvalid: Ember.computed.or("emailInvalid", "passwordInvalid"),
      emailWillChange: function() {
        this.set("emailInvalid", false);
      }.observesBefore("email"),
      passwordWillChange: function() {
        this.set("passwordInvalid", false);
      }.observesBefore("password"),
      setupSession: function(store, session) {

        if(store && typeof store.pushPayload === 'function') {
          var type = this.get("userModelType");
          store.pushPayload(type, session);
          session = store.find(type, session[type].id);
        }

        this.set("isSignedIn", true)
             .set("currentUser", session);
        return session;
      },
      teardownSession: function() {
        this.set("isSignedIn", false)
            .set("currentUser", null);
      },
      // store: ember-data store instance; how do we handle non-ember-data?
      // Options: skip: true|false // Doesn't make ajax request for session
      loadSession: function(store, options) {
        if(this.get("isSignedIn") && this.get("currentUser")) {
          return Ember.RSVP.resolve(this.get("currentUser"));
        } else if(options.skip) {
          return Ember.RSVP.resolve(null);
        } else {
          return this._loadSession(store, options);
        }
      },
      _loadSession: function (store) {
        var result,
            setup = this.setupSession.bind(this, store),
            teardown = this.teardownSession.bind(this);

        return this.ajax("get", this.get("currentSessionPath"))
               .then(setup)
               .catch(function(error) {
                 teardown();
                 throw error;
               });

      },
      signIn: function() {
        var setup = this.setupSession.bind(this),
            data = {
              user: {
                email: this.get("email"),
                password: this.get("password")
              }
            };

        return this.ajax("post", this.get("signInPath"), data)
                   .then(setup);
      },
      signOut: function() {
        var teardown = this.teardownSession.bind(this);

        return this.ajax("delete", this.get("signOutPath"))
                   .finally(teardown);
      },
      ajax: function(method, url, data) {
        return new Ember.RSVP.Promise(function(resolve) {
          return resolve($.ajax({
            url: url,
            type: method,
            dataType: "json",
            data: data
          }));
        });
      }
    });

    __exports__["default"] = Authenticator;
  });define("ember-devise-simple-auth",
  ["ember-devise-simple-auth/initializers/csrf","ember-devise-simple-auth/utils","ember-devise-simple-auth/initializers/session-route","ember-devise-simple-auth/initializers/authenticator"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__) {
    "use strict";
    var tryAction = __dependency2__.tryAction;
    var SessionRouteInitializer = __dependency3__["default"];
    var AuthenticatorInitializer = __dependency4__["default"];

    function lookupTargetRoute(transition, container) {
      var key = "route:" + transition.targetName;
      return container.lookup(key);
    }

    Ember.Route.reopen({
      beforeModel: function(transition) {
        var targetRoute = lookupTargetRoute(transition, this.container),
            _this = this;

        return this.get("authenticator")
                   .loadSession(this.get("store"), {skip: targetRoute.skipsAuthentication})
                   .catch(function() {
                     _this.transitionTo("session");
                   });
      },
      _actions: {
        signOut: function() {
          this.get("authenticator").signOut();
          tryAction(this, "didSignOut", function() {
            this.transitionTo("session");
          });
        },
        willTransition: function(transition) {
          var targetRoute = lookupTargetRoute(transition, this.container),
              needsAuth = !(this.get("authenticator.isSignedIn")
                            || targetRoute.skipsAuthentication);

          if(needsAuth) {
            this.transitionTo("session");
          } else {
            return true;
          }
        },
        error: function(reason) {
          if(reason.status == 401 || reason.status == 403) {
            tryAction(this, "unauthorizedRequest", function() {
              this.transitionTo("session");
            });
          } else {
            return true;
          }
        }
      }
    });

    Ember.Controller.reopen({
      isSignedIn: Ember.computed.alias("auth.isSignedIn"),
      currentUser: Ember.computed.alias("auth.currentUser"),
      invalidCredentials: Ember.computed.alias("auth.isInvalid")
    });

    Ember.Application.initializer(SessionRouteInitializer);
    Ember.Application.initializer(AuthenticatorInitializer);
  });define("app/routes/session",
  ["ember-devise-simple-auth/utils","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var tryAction = __dependency1__.tryAction;

    var SessionRoute = Ember.Route.extend({
      skipsAuthentication: true,
      model: function() {
        return this.get("authenticator");
      },
      validateCredentials: function() {
        return this.get("authenticator.isValid");
      },
      actions: {
        validateCredentials: function() {
          if(Ember.isEmpty(this.get("authenticator.email"))) {
            this.set("authenticator.emailInvalid", true);
          }

          if(Ember.isEmpty(this.get("authenticator.password"))) {
            this.set("authenticator.passwordInvalid", true);
          }

          return true;
        },
        signIn: function() {
          var route = this;

          this.send("validateCredentials");

          if(this.get("authenticator.isInvalid")) {
            return;
          }

          this.get("authenticator").signIn().
            then(function(session) {
              tryAction(route, "validSignIn", session);
            }).catch(function(error) {
              var controller = route.controllerFor("session");
              controller.set("loginFailed", true);
              tryAction(route, "invalidSignIn", error);
            });
        }
      }
    });


    __exports__["default"] = SessionRoute;
  });define("ember-devise-simple-auth/utils",
  ["exports"],
  function(__exports__) {
    "use strict";
    // Checks message for string from unhandled action error.
    //
    // "Nothing handled the action '" + name + "'. If you did handle the action, this error can be caused by returning true from an action handler in a controller, causing the action to bubble."
    //
    function isUnhandledAction(message) {
      return message.match(/^Nothing handled the action/);
    }

    function tryAction(target, action) {
      var args = Array.prototype.slice.call(arguments, 1, arguments.length);
      var possibleCb = args[args.length - 1];

      try {
        target.send.apply(target, args);
      } catch(error) {
        // Swallow 'Nothing handled action' errors
        if(!isUnhandledAction(error.message)) {
          throw error;
        } else if(typeof possibleCb === "function") {
          possibleCb.apply(target, args);
        }
      }
    }

    __exports__.tryAction = tryAction;
  });Ember.DeviseSimpleAuth = Ember.Namespace.create();

require('ember-devise-simple-auth');

var SessionRoute = require('app/routes/session').default;
Ember.DeviseSimpleAuth.SessionRoute = SessionRoute;

Ember.Application.initializer({
  name: "register-session-route",
  initialize: function(container, app) {
    container.register("route:session", SessionRoute);
  }
});
