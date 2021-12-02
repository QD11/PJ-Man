class TeamUserSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :team_id, :title, :admin, :owner, :email, :user

  def user
    ::UserSerializer.new(object.user)
  end

end
