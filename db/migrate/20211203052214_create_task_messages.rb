class CreateTaskMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :task_messages do |t|
      t.belongs_to :task, null: false, foreign_key: true
      t.belongs_to :team_user, null: false, foreign_key: true
      t.text :message

      t.timestamps
    end
  end
end
