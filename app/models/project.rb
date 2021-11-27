class Project < ApplicationRecord
  belongs_to :team

  validates :name, presence: true
  validates :name, uniqueness: { scope: :team_id}
  validates :priority, presence: true
end
