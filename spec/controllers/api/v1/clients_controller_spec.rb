require 'spec_helper'

describe Api::V1::ClientsController do
  describe "GET index" do
    it "assigns all clients as @clients" do
      client = FactoryGirl.create(:client)
      get :index, format: :json
      expect(assigns(:clients)).to eq([client])
    end
  end

  describe "GET show" do
    it "assigns the requested client as @client" do
      client = FactoryGirl.create(:client)
      get :show, {:id => client.to_param, format: :json}
      expect(assigns(:client)).to eq(client)
    end
  end

  describe "POST create" do
    describe "with valid params" do
      let(:valid_attributes){
        FactoryGirl.attributes_for(:client,
          first_name: 'Tyrion',
          last_name:  'Lannister',
          email: 'tyrion@lannisport.com',
          phone: '1234567'
        )
      }

      it "creates a new Client" do
        expect {
          post :create, {:client => valid_attributes, format: :json}
        }.to change(Client, :count).by(1)
      end

      it "assigns a newly created client as @client" do
        post :create, {:client => valid_attributes, format: :json}
        expect(assigns(:client)).to be_a(Client)
        expect(assigns(:client)).to be_persisted
      end

      it "returns 201 on success" do
        post :create, {:client => valid_attributes, format: :json}
        expect(response.status).to eq(201)
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved client as @client" do
        allow_any_instance_of(Client).to receive(:save).and_return(false)
        post :create, {:client => { "first_name" => "" }, format: :json}
        expect(assigns(:client)).to be_a_new(Client)
      end

      it "returns unprocessable entity status code" do
        allow_any_instance_of(Client).to receive(:save).and_return(false)
        post :create, {:client => { "first_name" => "" }, format: :json}
        expect(response.status).to eq(422)
      end
    end
  end

  describe "PUT update" do
    let(:client){
      FactoryGirl.create(:client)
    }

    describe "with valid params" do
      it "updates the requested client" do
        allow_any_instance_of(Client).to receive(:update).with({ "first_name" => "Test" })
        put :update, {:id => client.to_param, :client => { "first_name" => "Test" }, format: :json}
      end

      it "assigns the requested client as @client" do
        put :update, {:id => client.to_param, :client => { "first_name" => "Test" }, format: :json}
        expect(assigns(:client)).to eq(client)
      end

      it "returns 204 on success" do
        put :update, {:id => client.to_param, :client => { "first_name" => "Test" }, format: :json}
        expect(response.status).to eq(204)
      end
    end

    describe "with invalid params" do
      it "assigns the client as @client" do
        allow_any_instance_of(Client).to receive(:save).and_return(false)
        put :update, {:id => client.to_param, :client => { "first_name" => "" }}
        expect(assigns(:client)).to eq(client)
      end

      it "returns 422 when failing to update" do
        allow_any_instance_of(Client).to receive(:save).and_return(false)
        put :update, {:id => client.to_param, :client => { "first_name" => "" }}
        expect(response.status).to eq(422)
      end
    end
  end

  describe "DELETE destroy" do
    it "destroys the requested client" do
      client = FactoryGirl.create(:client)
      expect {
        delete :destroy, {:id => client.to_param}
      }.to change(Client, :count).by(-1)
    end

    it "returns 204 on delete" do
      client = FactoryGirl.create(:client)
      delete :destroy, {:id => client.to_param}
      expect(response.status).to eq(204)
    end
  end
end
