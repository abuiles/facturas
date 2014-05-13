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

app.import('vendor/_ember-devise-simple-auth.js', {
  'ember-devise-simple-auth': [
    'default'
  ]
});

app.import('vendor/accounting/accounting.js', {
  'accounting': ['formatMoney']
});

app.import('vendor/momentjs/min/moment-with-langs.min.js', {
  'moment': [
    'default'
  ]
});

app.import('vendor/ember-data/ember-data.js');

// If the library that you are including contains AMD or ES6 modules that
// you would like to import into your application please specify an
// object with the list of modules as keys along with the exports of each
// module as its value.
app.import('vendor/ic-ajax/dist/named-amd/main.js', {
  'ic-ajax': [
    'default',
    'defineFixture',
    'lookupFixture',
    'raw',
    'request',
  ]
});

app.import('vendor/ember-test-helpers/dist/ember-test-helpers.js');
app.import('vendor/_amdize.js');

module.exports = app.toTree();
