class Api::V1::ApplicationController < ApplicationController
  before_filter :authenticate_user!
end
