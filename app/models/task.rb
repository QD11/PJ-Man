class Task < ApplicationRecord
  belongs_to :section
  has_many :task_users, dependent: :destroy
  has_many :users, through: :task_users
  has_many :team_users, through: :task_users

  validates :name, presence: true
  validates :name, uniqueness: { scope: [:section_id]}
end
