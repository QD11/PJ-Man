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
        render json: task, status: :created
    end
end
