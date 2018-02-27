class ChangeStartTimeToUserLocations < ActiveRecord::Migration[5.1]
  def change
    change_column :user_locations, :start_time, :string
    change_column :user_locations, :end_time, :string 
  end
end
