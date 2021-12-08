class ChatMessagesController < ApplicationController

    def index
        if params[:chatroom_id]
            chat_messages = ChatMessage.where(chatroom_id:  params[:chatroom_id])
        end
        render json: chat_messages
    end

    def get_last_message
        chatroom = Chatroom.find_by(id: params[:chatroom_id])
        last_message = chatroom.chat_messages.last
        render json: last_message, serializer: ChatMessageSerializer
    end
end
