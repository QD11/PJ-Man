class TaskMessagesController < ApplicationController
    def index
        if params[:task_id]
            task = Task.find(params[:task_id])
            messages = task.task_messages
            render json: messages
        end
    end

    def create
        message = TaskMessage.create!(task_id: params[:task_id], team_user_id: params[:team_user_id], message: params[:message])
        task = Task.find(params[:task_id])
        messages = task.task_messages
        render json: messages
    end
end
