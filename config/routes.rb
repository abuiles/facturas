Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :clients
      resources :invoice_items
    end
  end

  get '*foo', :to => 'landing#index'
end
