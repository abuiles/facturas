class AddBalanceToClients < ActiveRecord::Migration
  def change
    add_column :clients, :balance, :integer, default: 0
  end
end
