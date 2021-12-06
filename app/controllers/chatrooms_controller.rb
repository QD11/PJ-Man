class ChatroomsController < ApplicationController

    def index
        if params[:team_user_id]
            chatrooms = Chatroom.joins(:chat_members).where(chat_members: {team_user_id: params[:team_user_id]})
            render json: chatrooms
        end
    end
end
