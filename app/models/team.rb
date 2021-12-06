class Team < ApplicationRecord
    has_many :team_users
    has_many :users, through: :team_users
    has_many :projects
    has_many :chatrooms
    
    validates :name, presence: true, uniqueness: true
    validates :description, presence: true
end
