class InvoiceItem < ActiveRecord::Base
  belongs_to :client

  validates :amount,        presence: true
  validates :description,   presence: true

  scope :with_includes, lambda {
    includes(:client)
  }
end
