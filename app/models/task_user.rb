class TaskUser < ApplicationRecord
  belongs_to :task
  belongs_to :user
  belongs_to :team_user

  validates :task, uniqueness: {scope: :user_id}
end
