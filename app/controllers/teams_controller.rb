class TeamsController < ApplicationController
    
    def teams_specific_to_user
        user = User.find_by(id: params[:user_id])
        teams = Team.joins(:team_users).where(team_users: {user_id: user.id})
        render json: teams
    end

    def create
        team = Team.create(name: params[:name], description: params[:description])
        team_user = TeamUser.create(user_id: params[:user_id], team_id: team.id, admin: true, owner: true)
        render json: team
    end
end
