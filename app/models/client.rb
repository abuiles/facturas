class Client < ActiveRecord::Base
  has_many :invoice_items

  validates :email,      presence: true
  validates :first_name, presence: true
  validates :last_name,  presence: true
  validates :phone,      presence: true

  acts_as_paranoid

  def update_balance!
    debts = invoice_items.where(payment: false).sum(:amount)
    payments = invoice_items.where(payment: true).sum(:amount)
    self.balance =  debts - payments
    self.save
  end
end
