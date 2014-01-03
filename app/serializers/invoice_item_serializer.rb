class InvoiceItemSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :description, :amount
end
