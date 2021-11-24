class TeamUserSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :team_id, :admin, :owner
end
