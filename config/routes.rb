Rails.application.routes.draw do
  resources :organization_users
  resources :organizations
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get '/:user_id/organizations/', to: "organizations#organizations_specific_to_user"

  Rails.application.routes.draw do
  resources :organization_users
    mount ActionCable.server => '/cable'
  end
end