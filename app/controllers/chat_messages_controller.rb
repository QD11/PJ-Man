class ChatMessagesController < ApplicationController

    def index
        if params[:chatroom_id]
            chat_messages = ChatMessage.where(chatroom_id:  params[:chatroom_id])
        end
        render json: chat_messages
    end
end
