class Facturas::RegistrationsController < Devise::RegistrationsController
  after_action :set_csrf_headers, only: [:create, :destroy]

  protected

  def set_csrf_headers
    if request.xhr?
      response.headers['X-CSRF-Token'] = "#{form_authenticity_token}"
      response.headers['X-CSRF-Param'] = "#{request_forgery_protection_token}"
    end
  end
end
