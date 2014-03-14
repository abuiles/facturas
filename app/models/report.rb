class Report < ActiveRecord::Base
  def self.collect
    create(balance: Client.sum(:balance), date: Date.today)
  end
end
