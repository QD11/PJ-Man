class TaskUser < ApplicationRecord
  belongs_to :task
  belongs_to :user

  validates :task, uniqueness: {scope: :user_id}
end
