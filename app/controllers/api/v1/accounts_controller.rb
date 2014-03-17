class Api::V1::AccountsController < ApplicationController
  before_action :set_account, only: [:show, :update, :destroy]
  respond_to :json

  # GET /accounts
  def index
    respond_with Account.all
  end

  # GET /accounts/1
  def show
    respond_with @account
  end

  # POST /accounts
  def create
    @account = Account.new(account_params)

    if @account.save
      respond_with @account, status: :created, location: [:api, :v1, @account]
    else
      render json: { errors: @account.errors }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /accounts/1
  def update
    if @account.update(account_params)
      respond_with @account, status: :ok, location: [:api, :v1, @account]
    else
      render json: { errors: @account.errors }, status: :unprocessable_entity
    end
  end

  # DELETE /accounts/1
  def destroy
    @account.destroy
    head :no_content
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_account
    @account = Account.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def account_params
    params.require(:account).permit(:name)
  end
end
