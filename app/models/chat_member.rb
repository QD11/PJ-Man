class ChatMember < ApplicationRecord
  belongs_to :team_user
  belongs_to :chatroom
end
