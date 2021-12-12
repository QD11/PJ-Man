Rails.application.routes.draw do
  resources :chat_members
  resources :chat_messages
  resources :chatrooms
  resources :recruitments
  resources :tasks
  resources :sections
  resources :projects
  resources :team_users
  resources :teams
  resources :users
  resources :task_messages
  # resources :task_messages, only: [:index] do
  #   resources :tasks, only: [:index]
  # end
  resources :team_users, only: [:show] do
    resources :chatrooms, only: [:index]
  end

  resources :teams, only: [:show] do
    resources :tasks, only: [:index]
  end

  resources :chatrooms, only: [:show] do
    resources :chat_messages, only: [:index]
  end

  resources :tasks, only: [:show] do
    resources :task_messages, only: [:index]
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post 'uploads/prepare'
  patch "/pictures/:user_id", to: "users#update_picture"
  patch '/remove_picture', to: "users#remove_picture"

  delete '/tasks/:team_id/:task_id', to: 'tasks#destroy'

  get '/last_message/:chatroom_id', to: 'chat_messages#get_last_message'
  get '/teams/:team_id/tasks_week', to: 'tasks#completed_this_week'

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  get '/team_me', to: 'teams#show_one'

  get '/:team_user_id/tasks', to: 'tasks#tasks_specific_to_teamuser'

  patch '/change_admin/:team_user_id', to: 'team_users#change_admin'
  patch '/change_title/:team_user_id', to: 'team_users#change_title'

  post '/join', to: 'recruitments#join'

  post '/team_login', to: 'sessions#team_create'


  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  delete '/logout_team', to: 'sessions#destroy_team'

  delete '/:team_id/team_users/:team_user_id', to: 'team_users#destroy'

  patch '/:task_id/status_update', to: 'tasks#status_update'

  get '/:user_id/teams/', to: "teams#teams_specific_to_user"
  get '/:team_id/projects', to: "projects#projects_specific_to_team"
  # get '/:team_id/:project_name/

  # Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  # end
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end