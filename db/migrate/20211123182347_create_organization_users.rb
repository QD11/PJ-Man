class CreateOrganizationUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :organization_users do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :organization, null: false, foreign_key: true
      t.boolean :admin
      t.boolean :owner

      t.timestamps
    end
  end
end
