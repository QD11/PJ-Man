class Chatroom < ApplicationRecord
  belongs_to :team
  has_many :chat_messages, dependent: :destroy
  has_many :chat_members, dependent: :destroy
  has_many :team_users, through: :chat_members
end
