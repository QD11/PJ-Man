class ProjectsController < ApplicationController

    def projects_specific_to_team
        team = Team.find_by(id: params[:team_id])
        projects = Project.where(team_id: team.id)
        render json: projects, include: ['sections', 'sections.tasks']
    end

    def create
        project = Project.create!(project_params)
        render json: project, status: :created
    end

    private

    def project_params
        params.permit(:name, :priority, :team_id)
    end
end
