class Api::V1::DashboardController < Api::V1::ApplicationController
  def index
    render json: { balance: Client.sum(:balance) }
  end
end
