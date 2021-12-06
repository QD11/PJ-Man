class ChatroomSerializer < ActiveModel::Serializer
  attributes :id, :chat_members
  # has_many :chat_members
  def chat_members 
    object.chat_members.map do |chat_member|
      ::ChatMemberSerializer.new(chat_member)
    end
  end

end
