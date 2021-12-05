class TasksController < ApplicationController

    def destroy
        task = Task.find_by(id: params[:task_id])
        if task
            task.destroy
            section = task.section
            if section.tasks.empty?
                section.destroy
            end
            show_for_all
        # else
        #     render json: { error: "Task not found" }, status: :not_found
        end
    end

    def create
        # project = Project.find_by(name: params[:projectName], team_id: params[:team_id])
        section = Section.find_by(name: params[:section], project_id: params[:project_id])
        if !section
            section = Section.create(name: params[:section], project_id: params[:project_id])
        end
        task = Task.create!(name: params[:name], description: params[:description], completed: false, section_id: section.id)
        if task.valid?
            params[:member].each do |user|
                TaskUser.create(task_id: task.id, user_id: user["id"], team_user_id: user["team_user_id"])
            end
            # taskuser = TaskUser.create(task_id: task.id, user_id: params[:member])
        end
        # render json: task, status: :created
        show_for_all
    end

    def status_update
        task = Task.find_by(id: params[:task_id])
        task.update!(completed: params[:completed])
        show_for_all
        # render json: task
    end

    def tasks_specific_to_teamuser
        team_user = TeamUser.find_by(id: params[:team_user_id])
        tasks = team_user.tasks
        render json: tasks, each_serializer: TaskSectionSerializer
    end

    
end
