class Client < ActiveRecord::Base
  has_many :invoice_items

  validates :email,      presence: true
  validates :first_name, presence: true
  validates :last_name,  presence: true
  validates :phone,      presence: true
end
