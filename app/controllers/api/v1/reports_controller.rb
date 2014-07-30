class Api::V1::ReportsController < Api::V1::ApplicationController
  respond_to :json

  def index
    respond_with Report.resume, root: :reports, meta: meta
  end

  private

  def meta
    {
     balance: Report.balance,
     debtors: Report.debtors
    }
  end
end
