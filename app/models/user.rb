class User < ApplicationRecord
    has_many :team_users
    has_many :teams, through: :team_users
    has_many :task_users
    has_many :tasks, through: :task_users

    has_secure_password

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :email, presence: true, uniqueness: true
end
