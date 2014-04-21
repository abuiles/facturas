class AddDebtorsToReports < ActiveRecord::Migration
  def change
    add_column :reports, :debtors, :integer, default: 0
  end
end
