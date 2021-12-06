class Chatroom < ApplicationRecord
  belongs_to :team
  has_many :chat_message
  has_many :chat_members
  has_many :team_users, through: :chat_members
end
