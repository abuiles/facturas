class CreateInvoiceItems < ActiveRecord::Migration
  def change
    create_table :invoice_items do |t|
      t.integer :amount
      t.references :client

      t.timestamps
    end
  end
end
