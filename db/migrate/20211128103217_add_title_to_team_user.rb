class AddTitleToTeamUser < ActiveRecord::Migration[6.1]
  def change
    add_column :team_users, :title, :string
  end
end
