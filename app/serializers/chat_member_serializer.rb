class ChatMemberSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :team_user

end
