class TaskMessageSerializer < ActiveModel::Serializer
  attributes :id, :message, :created_at
  # has_one :task
  # has_one :team_user
  belongs_to :team_user
end
