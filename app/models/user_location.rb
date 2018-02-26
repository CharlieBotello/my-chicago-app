class UserLocation < ApplicationRecord
  belongs_to :user
  belongs_to :location 

  def as_json
    {
      id: self.id,
      user_id: self.user_id,
      location_id: self.location_id,
      start_time: self.start_time,
      end_time: self.end_time
    }
  end
end
