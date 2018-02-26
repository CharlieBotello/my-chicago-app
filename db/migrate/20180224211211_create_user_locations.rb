class CreateUserLocations < ActiveRecord::Migration[5.1]
  def change
    create_table :user_locations do |t|
      t.integer :user_id
      t.integer :location_id
      t.datetime :start_time
      t.datetime :end_time

      t.timestamps
    end
  end
end
