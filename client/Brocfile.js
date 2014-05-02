/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

EmberApp.prototype.populateLegacyFiles = function () {

  this.import('jquery/jquery.js');
  this.import('handlebars/handlebars.js');

  if (this.env === 'production') {
    this.import('ember-prod/index.js');
  } else {
    this.import('ember/index.js');
  }

  this.import('ember-cli-shims/app-shims.js', {
    ember: ['default']
  });

  this.import('ember-resolver/dist/modules/ember-resolver.js', {
    'ember/resolver': ['default']
  });

  this.import('ember-load-initializers/ember-load-initializers.js', {
    'ember/load-initializers': ['default']
  });
};


var app = new EmberApp({
  name: require('./package.json').name,

  // Use this to instruct the `broccoli-es6-concatenator` to allow
  // references to the following modules (this would commonly include
  // any modules exported from any AMD files added to `legacyFilesToAppend`)
  ignoredModules: [ ],

  // Use this to notify the import validator of any AMD modules
  // that you add to your project.
  importWhitelist: { },

  // hack
  getEnvJSON: require('./config/environment')
});

app.import('ember-data/ember-data.js');
app.import('ic-ajax/dist/named-amd/main.js', {
  'ic-ajax': [
    'default',
    'defineFixture',
    'lookupFixture',
    'raw',
    'request',
  ]
});


module.exports = app.toTree();
