class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :completed, :team_users
  
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

end
