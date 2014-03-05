class Api::V1::InvoiceItemsController < Api::V1::ApplicationController
  before_action :set_invoice_item, only: [:show, :edit, :update, :destroy]
  respond_to :json

  # GET /invoice_items
  def index
    @invoice_items = InvoiceItem.with_includes

    if params[:client_id]
      @invoice_items = @invoice_items.where(client_id: params[:client_id])
    end

    if params[:ids]
      @invoice_items = @invoice_items.where(id: params[:ids])
    end

    respond_with @invoice_items
  end

  def show
    respond_with @invoice_item
  end


  # POST /invoice_items
  def create
    @invoice_item = InvoiceItem.new(invoice_item_params)

    if @invoice_item.save
      respond_with @invoice_item, status: :created, location: [:api, :v1, @invoice_item]
    else
      render json: @invoice_item.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /invoice_items/1
  def update
    if @invoice_item.update(invoice_item_params)
      head :no_content
    else
      render json: @invoice_item.errors, status: :unprocessable_entity
    end
  end

  # DELETE /invoice_items/1
  def destroy
    @invoice_item.destroy

    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_invoice_item
      @invoice_item = InvoiceItem.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def invoice_item_params
      params.require(:invoice_item).permit(:amount, :description, :client_id, :payment)
    end
end
