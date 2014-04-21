class Api::V1::DashboardController < Api::V1::ApplicationController
  def index
    render json: { balance: Report.balance, debtors: Report.debtors }
  end
end
