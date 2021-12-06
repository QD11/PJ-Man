class TeamUsersController < ApplicationController

    def change_admin
        team_user = TeamUser.find_by(id: params[:team_user_id])
        if team_user
            team_user.update(admin: params[:admin])
            show_for_all
            # team = team_user.team
            # render json: team, include: ['team_users', 'team_users.user', 'projects', 'projects.sections', 'projects.sections.tasks']
        else
            render json: { error: "Team_user not found" }, status: :not_found
        end
    end

    def change_title
        team_user = TeamUser.find_by(id: params[:team_user_id])
        if team_user
            team_user.update(title: params[:title])
            show_for_all
            # team = team_user.team
            # render json: team, include: ['team_users', 'team_users.user', 'projects', 'projects.sections', 'projects.sections.tasks']
        else
            render json: { error: "Team_user not found" }, status: :not_found
        end
    end

    def destroy
        team_user = TeamUser.find_by(id: params[:team_user_id]) #find the user in the team
        # task_users = TaskUser.where(team_user_id: team_user.id)
        if team_user
            
            #delete chatrooms associated with the user
            chatrooms = team_user.chatrooms
            chatrooms.find_each do |chatroom|
                chatroom.destroy
            end

            team_user.destroy

            show_for_all
        else
            render json: { errors: "Team_user not found" }, status: :not_found
        end

    end

    private

    def team_user_params
        params.permit(:user_id, :team_id, :title, :admin, :owner, :email)
    end

end
