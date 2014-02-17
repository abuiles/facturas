class AddDeletedAtToInvoiceItems < ActiveRecord::Migration
  def change
    add_column :invoice_items, :deleted_at, :datetime
  end
end
