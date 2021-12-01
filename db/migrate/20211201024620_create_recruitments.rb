class CreateRecruitments < ActiveRecord::Migration[6.1]
  def change
    create_table :recruitments do |t|
      t.string :code
      t.string :email
      t.boolean :joined
      t.belongs_to :team, null: false, foreign_key: true

      t.timestamps
    end
  end
end
