class CreateProjects < ActiveRecord::Migration[6.1]
  def change
    create_table :projects do |t|
      t.string :name
      t.string :priority
      t.belongs_to :team, null: false, foreign_key: true

      t.timestamps
    end
  end
end
