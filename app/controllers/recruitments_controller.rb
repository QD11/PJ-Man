class RecruitmentsController < ApplicationController

    def create
        if !TeamUser.find_by(email: params[:email], team_id: params[:team_id])
            recruitment = Recruitment.create!(code: params[:code], email: params[:email], team_id: params[:team_id], joined: false)
            render json: recruitment
        else
            render json: {errors: "This user already exists in this team"}, status: :unprocessable_entity
        end
    end
    
    def join
        recruitment = Recruitment.find_by(code: params[:code], email: params[:email])
        if recruitment #check if code and email matches
            if !TeamUser.find_by(user_id: params[:user_id], team_id: recruitment.team_id) #check if it exists in the team
                TeamUser.create(user_id: params[:user_id], team_id: recruitment.team_id, admin: false, owner: false, email: params[:email])
                recruitment.update(joined: true)
                team = Team.find_by(id: recruitment.team_id)
                render json: team
            else
                render json: {errors: "This user already exists in this team"}, status: :unprocessable_entity
            end
        else
            render json: {errors: "Invalid Code or Wrong Email"}, status: :unprocessable_entity
        end
    end
end
