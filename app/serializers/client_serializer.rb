class ClientSerializer < ActiveModel::Serializer
  attributes :id, :balance, :first_name, :last_name, :phone, :email, :links

  def links
    {
      invoice_items: api_v1_invoice_items_path(client_id: object.id)
    }
  end
end
