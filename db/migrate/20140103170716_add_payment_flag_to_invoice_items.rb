class AddPaymentFlagToInvoiceItems < ActiveRecord::Migration
  def change
    add_column :invoice_items, :payment, :boolean, default: false
  end
end
