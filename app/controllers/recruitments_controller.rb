class RecruitmentsController < ApplicationController

    def create
        recruitment = Recruitment.create!(code: params[:code], email: params[:email], team_id: params[:team_id], joined: false)
        render json: recruitment
    end
    
    def join
        recruitment = Recruitment.find_by(code: params[:code], email: params[:email])
        if recruitment #check if code and email matches
            if !TeamUser.find_by(user_id: params[:user_id], team_id: recruitment.team_id) #check if it exists in the team
                TeamUser.create(user_id: params[:user_id], team_id: recruitment.team_id, admin: false, owner: false)
                recruitment.update(joined: true)
                team = Team.find_by(team_id: recruitment.team_id)
                render json: team
            else
                render json: {error: "This user already exists in this team"}, status: :unprocessable_entity
            end
        else
            render json: {error: "Invalid Code or Wrong Email"}, status: :unprocessable_entity
        end
    end
end
