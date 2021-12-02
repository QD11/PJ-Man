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
        team_user = TeamUser.find_by(id: params[:team_user_id]) #find the user in the team
        # task_users = TaskUser.where(team_user_id: team_user.id)
        if team_user
            # team = team_user.team
            team_user.destroy
            # head :no_content
            # projects = Project.where(team_id: team.id)
            # render json: {
            #     projects: projects.to_json(:include => ['sections', 'sections.tasks'], 
            #     team: team, serializer: TeamSerializer}
            projects_specific_to_team
        else
            render json: { errors: "Team_user not found" }, status: :not_found
        end

    end

    private

    def team_user_params
        params.permit(:user_id, :team_id, :title, :admin, :owner, :email)
    end

end
