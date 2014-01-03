class ClientSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :phone, :email
  embed :ids
  has_many :invoice_items
end
