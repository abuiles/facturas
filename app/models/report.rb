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

  def self.resume
    dates = (1..12).map { |x| x.months.ago.to_date }
    dates.push(1.day.ago.to_date)
    self.where(date: dates).order('date DESC')
  end
end
