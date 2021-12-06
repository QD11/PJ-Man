class ProjectsController < ApplicationController

    # def projects_specific_to_team
    #     team = Team.find_by(id: params[:team_id])
    #     projects = Project.where(team_id: team.id)
    #     render json: projects, include: ['sections', 'sections.tasks']
    # end

    def create
        project = Project.create!(name: params[:name], priority: params[:priority], team_id: params[:team_id], completed: false)
        # render json: project, status: :created
        show_for_all
    end

    def update
        project = Project.find_by(id: params[:id])
        team = project.team
        project.update!(name: params[:name], priority: params[:priority], completed: params[:completed])
        render json: team, include: ['team_users', 'team_users.user', 'projects', 'projects.sections', 'projects.sections.tasks']
    end

    def destroy
        project = Project.find_by(id: params[:id])
        team = project.team
        project.destroy
        render json: team, include: ['team_users', 'team_users.user', 'projects', 'projects.sections', 'projects.sections.tasks']
    end

    private

    def project_params
        params.permit(:name, :priority, :team_id)
    end
end
