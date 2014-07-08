require 'spec_helper';

describe LandingController do
  describe 'GET index' do
    it 'gets index from index_html' do
      expect(controller).to receive(:index_html)

      get :index
      expect(response).to be_success
    end

  end
end
