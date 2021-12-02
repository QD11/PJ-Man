class TeamSerializer < ActiveModel::Serializer
  attributes :id, :name, :description

  has_many :team_users
  has_many :users, through: :team_users
  has_many :projects

end
