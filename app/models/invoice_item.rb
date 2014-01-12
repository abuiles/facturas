class InvoiceItem < ActiveRecord::Base
  belongs_to :client

  validates :amount,        presence: true
  validates :description,   presence: true
end
