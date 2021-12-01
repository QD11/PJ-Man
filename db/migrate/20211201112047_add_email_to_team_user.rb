class AddEmailToTeamUser < ActiveRecord::Migration[6.1]
  def change
    add_column :team_users, :email, :string
  end
end
