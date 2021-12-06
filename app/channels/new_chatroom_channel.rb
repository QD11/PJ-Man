class NewChatroomChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    @team = Team.find(params[:team_id])
    stream_for @team
  end

  def receive(data)
    #data I send is of my teamuser id and another person id
    chatroom = @team.chatrooms.create
    chat_members_one = chatroom.chat_members.create(team_user_id: data['one_team_user_id'])
    chat_members_two = chatroom.chat_members.create(team_user_id: data['two_team_user_id'])
    NewChatroomChannel.broadcast_to(@team, ChatroomSerializer.new(chatroom))

  end

  def unsubscribed
    stop_all_streams
  end
end
