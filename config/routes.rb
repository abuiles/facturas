Rails.application.routes.draw do
  # devise_scope :user do
  #   get "/sessions/current" => "sessions#show"
  # end

  devise_for :users, controllers: {
    sessions: 'sessions',
    registrations: "facturas/registrations"
  }

  namespace :api do
    namespace :v1 do
      get :csrf, to: 'csrf#index'
      resources :clients
      resources :invoice_items
      resources :reports
    end
  end

  get '*foo', :to => 'landing#index'

  root :to => 'landing#index'
end
