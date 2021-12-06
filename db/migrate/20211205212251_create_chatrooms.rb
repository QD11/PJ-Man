class CreateChatrooms < ActiveRecord::Migration[6.1]
  def change
    create_table :chatrooms do |t|
      t.belongs_to :team, null: false, foreign_key: true

      t.timestamps
    end
  end
end
