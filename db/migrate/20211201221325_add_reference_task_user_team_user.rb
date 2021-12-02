class AddReferenceTaskUserTeamUser < ActiveRecord::Migration[6.1]
  def change
    add_reference :task_users, :team_user, foreigh_key: true
  end
end
