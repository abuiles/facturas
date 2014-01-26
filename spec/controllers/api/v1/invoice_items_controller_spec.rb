require 'spec_helper'

describe Api::V1::InvoiceItemsController do
  describe "GET index" do
    it "assigns all invoice_items as @invoice_items" do
      invoice_item = FactoryGirl.create(:invoice_item)
      get :index, format: :json
      expect(assigns(:invoice_items)).to eq([invoice_item])
    end

    describe "with client_id" do
      it "returns invoice_items scoped to client" do
        scope = []
        expect(InvoiceItem).to receive(:with_includes){ scope }
        expect(scope).to receive(:where).with(client_id: 1){ scope }

        get :index, client_id: 1, format: :json
      end
    end
  end

  describe "GET show" do
    it "assigns the requested invoice_item as @invoice_item" do
      invoice_item = FactoryGirl.create(:invoice_item)
      get :show, {:id => invoice_item.to_param, format: :json}
      expect(assigns(:invoice_item)).to eq(invoice_item)
    end
  end

  describe "POST create" do
    describe "with valid params" do
      let(:valid_attributes){
        FactoryGirl.attributes_for(:invoice_item,
          amount: '10000',
          description: 'Glass of Dornish wine'
        )
      }

      it "creates a new InvoiceItem" do
        expect {
          post :create, {:invoice_item => valid_attributes, format: :json}
        }.to change(InvoiceItem, :count).by(1)
      end

      it "assigns a newly created invoice_item as @invoice_item" do
        post :create, {:invoice_item => valid_attributes, format: :json}
        expect(assigns(:invoice_item)).to be_a(InvoiceItem)
        expect(assigns(:invoice_item)).to be_persisted
      end

      it "returns 201 on success" do
        post :create, {:invoice_item => valid_attributes, format: :json}
        expect(response.status).to eq(201)
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved invoice_item as @invoice_item" do
        allow_any_instance_of(InvoiceItem).to receive(:save).and_return(false)
        post :create, {:invoice_item => { "description" => "" }, format: :json}
        expect(assigns(:invoice_item)).to be_a_new(InvoiceItem)
      end

      it "returns unprocessable entity status code" do
        allow_any_instance_of(InvoiceItem).to receive(:save).and_return(false)
        post :create, {:invoice_item => { "description" => "" }, format: :json}
        expect(response.status).to eq(422)
      end
    end
  end

  describe "PUT update" do
    let(:invoice_item){
      FactoryGirl.create(:invoice_item)
    }

    describe "with valid params" do
      it "updates the requested invoice_item" do
        allow_any_instance_of(InvoiceItem).to receive(:update).with({ "description" => "Test" })
        put :update, {:id => invoice_item.to_param, :invoice_item => { "description" => "Test" }, format: :json}
      end

      it "assigns the requested invoice_item as @invoice_item" do
        put :update, {:id => invoice_item.to_param, :invoice_item => { "description" => "Test" }, format: :json}
        expect(assigns(:invoice_item)).to eq(invoice_item)
      end

      it "returns 204 on success" do
        put :update, {:id => invoice_item.to_param, :invoice_item => { "description" => "Test" }, format: :json}
        expect(response.status).to eq(204)
      end
    end

    describe "with invalid params" do
      it "assigns the invoice_item as @invoice_item" do
        allow_any_instance_of(InvoiceItem).to receive(:save).and_return(false)
        put :update, {:id => invoice_item.to_param, :invoice_item => { "description" => "" }}
        expect(assigns(:invoice_item)).to eq(invoice_item)
      end

      it "returns 422 when failing to update" do
        allow_any_instance_of(InvoiceItem).to receive(:save).and_return(false)
        put :update, {:id => invoice_item.to_param, :invoice_item => { "description" => "" }}
        expect(response.status).to eq(422)
      end
    end
  end

  describe "DELETE destroy" do
    it "destroys the requested invoice_item" do
      invoice_item = FactoryGirl.create(:invoice_item)
      expect {
        delete :destroy, {:id => invoice_item.to_param}
      }.to change(InvoiceItem, :count).by(-1)
    end

    it "returns 204 on delete" do
      invoice_item = FactoryGirl.create(:invoice_item)
      delete :destroy, {:id => invoice_item.to_param}
      expect(response.status).to eq(204)
    end
  end
end
