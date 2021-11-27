class ProjectsController < ApplicationController

    def create
        project = Project.create!(project_params)
        render json: project, status: :created
    end

    private

    def project_params
        params.permit(:name, :priority, :team_id)
    end
end
