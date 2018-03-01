class UserLocation < ApplicationRecord
  belongs_to :user
  belongs_to :location 
  def pretty_start_time
    self.start_time.strftime("%b %e, %l:%M %p")
  end
  def pretty_end_time
    self.end_time.strftime("%b %e, %l:%M %p")
  end
  def as_json
    {
      id: self.id,
      user_id: self.user_id,
      location_id: self.location_id,
      start_time: self.pretty_start_time,
      end_time: self.pretty_end_time
    }
  end
end
