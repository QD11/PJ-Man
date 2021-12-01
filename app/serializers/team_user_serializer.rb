class TeamUserSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :team_id, :title, :admin, :owner, :email

end
