class Task < ApplicationRecord
  belongs_to :section
  has_many :taskusers
  has_many :users, through: :taskusers

  validates :name, presence: true
  validates :name, uniqueness: { scope: [:section_id]}
end
