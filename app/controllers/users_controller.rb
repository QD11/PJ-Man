class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create, :index]

    
end
