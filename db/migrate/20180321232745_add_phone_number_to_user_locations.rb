class AddPhoneNumberToUserLocations < ActiveRecord::Migration[5.1]
  def change
    add_column :user_locations, :phone_number, :string
  end
end
