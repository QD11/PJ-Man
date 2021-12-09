class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :completed, :team_users, :task_messages, :created_at, :due_date, :completed_date
  
  # def users
  #   object.users.map do|user|
  #     ::UserSerializer.new(user)
  #   end
  # end

  def team_users
    object.team_users.map do|team_user|
      ::TeamUserSerializer.new(team_user)
    end
  end

  def task_messages
    object.task_messages.map do |task_message|
      ::TaskMessageSerializer.new(task_message)
    end
  end

end
