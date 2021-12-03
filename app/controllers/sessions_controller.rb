class SessionsController < ApplicationController
    skip_before_action :authorize, only: [:create, :team_login]

    def create 
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user
        else 
            render json: {error: "Invalid username or password"}, status: :unauthorized
        end
    end

    def team_create
        team = Team.find_by(id: params[:team_id])
        if team
            session[:team_id] = team.id
            render json: team
        else
            render json: {error: "Invalid team"}, status: :unauthorized
        end
    end

    def destroy
        session.delete :user_id
        # session.delete :organization_id
        head :no_content
    end
end