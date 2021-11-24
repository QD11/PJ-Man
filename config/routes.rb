Rails.application.routes.draw do
  resources :team_users
  resources :teams
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  # get '/org', to: 'organizations#show'

  # post '/org_login', to: 'sessions#org_create'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get '/:user_id/teams/', to: "teams#teams_specific_to_user"

  Rails.application.routes.draw do
    mount ActionCable.server => '/cable'
  end
end