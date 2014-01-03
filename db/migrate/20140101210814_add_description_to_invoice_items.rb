class AddDescriptionToInvoiceItems < ActiveRecord::Migration
  def change
    add_column :invoice_items, :description, :string
  end
end
