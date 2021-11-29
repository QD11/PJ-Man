class ApplicationController < ActionController::API
    include ActionController::Cookies

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    before_action :authorize 

    def projects_specific_to_team
        team = Team.find_by(id: params[:team_id])
        projects = Project.where(team_id: team.id)
        render json: projects, include: ['sections', 'sections.tasks']
    end


    private 

    def authorize
        @current_user = User.find_by(id: session[:user_id])

        render json: {errors: ["Not authorized"]}, status: :unauthorized unless @current_user
    end

    def render_not_found_response
        render json: {errors: "Not Found"}, status: :not_found 
    end

    def render_unprocessable_entity_response(exception) 
        render json: {errors: exception.record.errors.full_messages}, status: :unprocessable_entity
    end
end
