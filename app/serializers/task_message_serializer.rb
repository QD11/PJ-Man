class TaskMessageSerializer < ActiveModel::Serializer
  attributes :id, :message
  has_one :task
  has_one :team_user
end
