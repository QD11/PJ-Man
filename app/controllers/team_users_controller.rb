class TeamUsersController < ApplicationController

    def change_admin
        team_user = TeamUser.find_by(id: params[:team_user_id])
        if team_user
            team_user.update(admin: params[:admin])
            team = Team.find_by(id: params[:team_id])
            render json: team, status: :ok
        else
            render json: { error: "Team_user not found" }, status: :not_found
        end
    end

    def destroy
        team_user = TeamUser.find_by(id: params[:id])
    end

    private

    def team_user_params
        params.permit(:user_id, :team_id, :title, :admin, :owner, :email)
    end

end
