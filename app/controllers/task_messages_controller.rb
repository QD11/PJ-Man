class TaskMessagesController < ApplicationController
    def index
        if params[:task_id]
            task = Task.find(params[:task_id])
            messages = task.task_messages
        end
        render json: messages
    end
end
