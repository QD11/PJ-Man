class TeamUser < ApplicationRecord
  belongs_to :user
  belongs_to :team
  has_many :task_users, dependent: :destroy
  has_many :tasks, through: :task_users
end
