class Api::V1::ClientsController < Api::V1::ApplicationController
  before_action :set_client, only: [:show, :edit, :update, :destroy]

  respond_to :json

  # GET /clients
  def index
    @clients = Client.all

    respond_with @clients
  end

  # GET /clients/1
  def show
    respond_with @client
  end

  # POST /clients
  def create
    @client = Client.new(client_params)

    if @client.save
      respond_with(@client, status: :created, location: [:api, :v1, @client])
    else
      render json: @client.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /clients/1
  def update
    if @client.update(client_params)
      head :no_content
    else
      render json: @client.errors, status: :unprocessable_entity
    end
  end

  # DELETE /clients/1
  def destroy
    @client.destroy

    head :no_content
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_client
    @client = Client.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def client_params
    params.require(:client).permit(:first_name, :last_name, :phone, :email)
  end
end
