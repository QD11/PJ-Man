class CreateChatMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :chat_messages do |t|
      t.string :message
      t.belongs_to :team_user, null: false, foreign_key: true
      t.belongs_to :chatroom, null: false, foreign_key: true

      t.timestamps
    end
  end
end
