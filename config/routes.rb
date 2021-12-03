Rails.application.routes.draw do
  resources :task_messages
  resources :recruitments
  resources :task_users
  resources :tasks
  resources :sections
  resources :projects
  resources :team_users
  resources :teams
  resources :users

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post 'uploads/prepare'
  patch "/pictures/:user_id", to: "users#update_picture"
  patch '/remove_picture', to: "users#remove_picture"

  delete '/tasks/:team_id/:task_id', to: 'tasks#destroy'


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
  delete '/logout_team', to: 'dessions#destroy_team'

  delete '/:team_id/team_users/:team_user_id', to: 'team_users#destroy'

  patch '/:task_id/status_update', to: 'tasks#status_update'

  get '/:user_id/teams/', to: "teams#teams_specific_to_user"
  get '/:team_id/projects', to: "projects#projects_specific_to_team"
  # get '/:team_id/:project_name/

  # Rails.application.routes.draw do
  resources :task_messages
  mount ActionCable.server => '/cable'
  # end
end