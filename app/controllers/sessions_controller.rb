class SessionsController < ApplicationController
    skip_before_action :authorize, only: [:create]

    def create 
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user
        else 
            render json: {error: "Invalid username or password"}, status: :unauthorized
        end
    end

    # def org_create
    #     org = Organization.find_by(id: params[:organization_id])
    #     if org
    #         session[:organization_id] = org.id
    #         render json: org
    #     else
    #         render json: {error: "Invalid organization"}, status: :unauthorized
    #     end
    # end

    def destroy
        session.delete :user_id
        # session.delete :organization_id
        head :no_content
    end
end