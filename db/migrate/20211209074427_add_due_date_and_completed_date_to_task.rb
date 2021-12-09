class AddDueDateAndCompletedDateToTask < ActiveRecord::Migration[6.1]
  def change
    add_column :tasks, :due_date, :date
    add_column :tasks, :completed_date, :date
  end
end
