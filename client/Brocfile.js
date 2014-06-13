/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var fileMover   = require('broccoli-file-mover');

var vendorTree = fileMover('vendor', {
  files: {
    'ember/index.js': 'ember/ember.js',
    'ember-prod/index.js': 'ember/ember.prod.js'
  }
});

var app = new EmberApp({
  name: require('./package.json').name,
  trees: {
    vendor: vendorTree
  },
  importWhitelist: {
    'accounting': ['formatMoney'],
    'moment': ['default'],
    'ember-devise-simple-auth': ['default']
  },
  minifyCSS: {
    enabled: true,
    options: {}
  },
  getEnvJSON: require('./config/environment')
});

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

app.import({
  development: 'vendor/ember-data/ember-data.js',
  production:  'vendor/ember-data/ember-data.prod.js'
}, {
  'ember-data': [
    'default'
  ]
});

app.import('vendor/_ember-devise-simple-auth.js', {
  availableModules: {
    'ember-devise-simple-auth': [
      'default'
    ]
  }
});

app.import('vendor/accounting/accounting.js', {
  availableModules: {
    'accounting': ['formatMoney']
  },
  deanonymize: true
});

app.import('vendor/momentjs/moment.js', {
  availableModules: {
    'moment': [
      'default'
    ]
  }
});

app.import('vendor/ic-ajax/dist/named-amd/main.js', {
  availableModules: {
    'ic-ajax': [
      'default',
      'defineFixture',
      'lookupFixture',
      'raw',
      'request',
    ]
  }
});

app.import('vendor/rails-csrf/dist/named-amd/main.js', {
  availableModules: {
    'rails-csrf': [
      'service'
    ]
  }
});

app.import('vendor/ember-test-helpers/dist/ember-test-helpers.js');
app.import('vendor/_amdize.js');

module.exports = app.toTree();
