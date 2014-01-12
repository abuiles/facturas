class InvoiceItemSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :description, :amount, :payment

  embed :ids
  has_one :client
end
