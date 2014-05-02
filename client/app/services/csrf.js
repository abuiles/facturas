//  Based on https://gist.github.com/leepfrog/4801db407cb5a07ebf6d
import { request } from 'ic-ajax';

export default Em.Object.extend({
  setData: function(data) {
    this.set('data', data);
  },
  fetchToken: function() {
    var setToken = this.setData.bind(this);
    if (!this.get('data')) {
      return request('api/v1/csrf').then(setToken);
    }
  }
});
