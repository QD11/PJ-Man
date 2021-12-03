class TaskMessage < ApplicationRecord
  belongs_to :task
  belongs_to :team_user
end
