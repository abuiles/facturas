class ReportSerializer < ActiveModel::Serializer
  attributes :id, :date, :balance, :debtors
end
