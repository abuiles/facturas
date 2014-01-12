Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :clients
      resources :invoice_items
      # resources :tests, except: [:new, :edit]
    end
  end

  get '*foo', :to => 'landing#index'
end
