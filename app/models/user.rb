class User < ApplicationRecord
    has_many :organization_users
    has_many :organizations, through: :organization_users

    has_secure_password

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :email, presence: true, uniqueness: true
end
