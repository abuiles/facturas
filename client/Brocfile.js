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

  // Use this to instruct the `broccoli-es6-concatenator` to allow
  // references to the following modules (this would commonly include
  // any modules exported from any AMD files added to `legacyFilesToAppend`)
  ignoredModules: ['ember-devise-simple-auth'],

  // Use this to notify the import validator of any AMD modules
  // that you add to your project.
  importWhitelist: { },

  // hack
  getEnvJSON: require('./config/environment')
});

app.import('vendor/_ember-devise-simple-auth.js', {
  'ember-devise-simple-auth': [
    'default'
  ]
});

app.import('vendor/ember-data/ember-data.js');
app.import('vendor/ic-ajax/dist/named-amd/main.js', {
  'ic-ajax': [
    'default',
    'defineFixture',
    'lookupFixture',
    'raw',
    'request',
  ]
});


module.exports = app.toTree();
