class AddCompletedToProjects < ActiveRecord::Migration[6.1]
  def change
    add_column :projects, :completed, :boolean
  end
end
