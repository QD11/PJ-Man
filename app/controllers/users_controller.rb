class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create, :index]
    #skip_before_action :authorize, except: [:update]

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user
    end

    def index
        render json: User.all
    end

    def show
        render json: @current_user
    end  

    def update_picture
        user = User.find_by(id: params[:user_id])
        if user
            user.update(update_user_params)
            render json: user, status: :ok
        else 
            render json: user.errors, status: :unprocessable_entity
        end
    end

    def remove_picture
        user = User.find_by(id: session[:user_id])
        if user
            user.update(profile_picture_url: '', profile_picture_thumbnail_url: '', cloudinary_public_id: '')
            render json: user, status: :ok
        else 
            render json: user.errors, status: :unprocessable_entity
        end
    end
    

    private

    def user_params
        params.permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end

    def update_user_params
        params.permit(:profile_picture_url, :profile_picture_thumbnail_url, :cloudinary_public_id)
    end
end
