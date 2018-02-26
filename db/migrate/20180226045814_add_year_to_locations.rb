class AddYearToLocations < ActiveRecord::Migration[5.1]
  def change
    add_column :locations, :year, :string
  end
end
