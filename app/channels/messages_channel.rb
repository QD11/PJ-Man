class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    @chatroom = Chatroom.find(params[:chatroom_id])
    stream_for @chatroom
  end
  
  def receive(data)
    teamUser = TeamUser.find_by(id: data['sender_team_user_id'])
    message = @chatroom.chat_message.create(message: data['message'], team_user: teamUser)
    MessagesChannel.broadcast_to(@chatroom, ChatMessageSerializer.new(message))
  end

  def unsubscribed
    stop_all_streams
  end
end
