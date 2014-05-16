//  Based on https://gist.github.com/leepfrog/4801db407cb5a07ebf6d
import { request } from 'ic-ajax';

export default Em.Object.extend({
  setPrefilter: function() {
    var token = this.get('data').token;
    var preFilter = function(options, originalOptions, jqXHR) {
      return jqXHR.setRequestHeader('X-CSRF-Token', token );
    };
    $.ajaxPrefilter(preFilter);
  },
  setData: function(data) {
    var param = Object.keys(data)[0];
    this.set('data', { param: param, token: data[param] });
    this.setPrefilter();
  },
  fetchToken: function() {
    var setToken = this.setData.bind(this);
    if (!this.get('data')) {
      return request('api/v1/csrf').then(setToken);
    }
  },
  updateCSRF: function() {
    var _this = this;
    $(document).on("ajaxComplete", function(event, xhr) {
      var csrf_param = xhr.getResponseHeader('X-CSRF-Param'),
      csrf_token = xhr.getResponseHeader('X-CSRF-Token');
      var data = _this.get('data');
      if (csrf_param) {
        data.param = csrf_param;
      }
      if (csrf_token) {
        data.token = csrf_token;
      }
      _this.set('data', data);
    });
  }.on('init')
});
