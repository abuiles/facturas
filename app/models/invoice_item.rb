class InvoiceItem < ActiveRecord::Base
  belongs_to :client

  validates :amount,        presence: true
  validates :description,   presence: true

  scope :with_includes, lambda {
    includes(:client)
  }

  after_create :update_client_balance

  acts_as_paranoid

  private

  def update_client_balance
    client.update_balance!
  end
end
