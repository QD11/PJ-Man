class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :completed, :users
  
  def users
    object.users.map do|user|
      ::UserSerializer.new(user)
    end
  end
end
