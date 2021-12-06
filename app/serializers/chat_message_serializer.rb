class ChatMessageSerializer < ActiveModel::Serializer
  attributes :id, :message, :created_at
  has_one :team_user
  has_one :chatroom

end
