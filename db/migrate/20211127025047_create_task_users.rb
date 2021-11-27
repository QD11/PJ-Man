class CreateTaskUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :task_users do |t|
      t.belongs_to :task, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
