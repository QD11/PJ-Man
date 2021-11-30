class TasksController < ApplicationController


    def create
        # project = Project.find_by(name: params[:projectName], team_id: params[:team_id])
        section = Section.find_by(name: params[:section], project_id: params[:project_id])
        if !section
            section = Section.create(name: params[:section], project_id: params[:project_id])
        end
        task = Task.create!(name: params[:name], description: params[:description], completed: false, section_id: section.id)
        if task.valid?
            taskuser = TaskUser.create(task_id: task.id, user_id: params[:member])
        end
        # render json: task, status: :created
        projects_specific_to_team
    end

    def status_update
        task = Task.find_by(id: params[:task_id])
        task.update!(completed: params[:completed])
        projects_specific_to_team
        # render json: task
    end
end
