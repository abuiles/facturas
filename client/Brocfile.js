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

app.import('vendor/custom-plugins/_ember-devise-simple-auth.js', {
  exports: {
    'ember-devise-simple-auth': [
      'default'
    ]
  }
});

app.import('vendor/accounting/accounting.js', {
  exports: {
    'accounting': ['formatMoney']
  },
  deanonymize: true,
  name: 'accounting'
});

app.import('vendor/momentjs/min/moment-with-langs.min.js', {
  exports: {
    'moment': [
      'default'
    ]
  }
});

app.import('vendor/rails-csrf/dist/named-amd/main.js', {
  exports: {
    'rails-csrf': [
      'service',
      'setCsrfUrl'
    ]
  }
});

app.import('vendor/ember-test-helpers/dist/ember-test-helpers.js');
app.import('vendor/custom-plugins/_amdize.js');

module.exports = app.toTree();
