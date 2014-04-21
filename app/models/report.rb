class Report < ActiveRecord::Base
  def self.collect
    create(balance: balance, debtors: debtors, date: Date.today)
  end

  def self.balance
    Client.sum(:balance)
  end

  def self.debtors
    Client.where('balance > 0').count
  end
end
