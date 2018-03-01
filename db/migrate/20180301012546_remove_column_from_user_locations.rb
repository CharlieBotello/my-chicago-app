class RemoveColumnFromUserLocations < ActiveRecord::Migration[5.1]
  def change
    remove_column :user_locations, :start_time, :string
    remove_column :user_locations, :end_time, :string
    add_column :user_locations, :start_time, :datetime
    add_column :user_locations, :end_time, :datetime
  end
end
