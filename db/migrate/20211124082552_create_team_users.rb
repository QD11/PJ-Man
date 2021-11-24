class CreateTeamUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :team_users do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :team, null: false, foreign_key: true
      t.boolean :admin
      t.boolean :owner

      t.timestamps
    end
  end
end
