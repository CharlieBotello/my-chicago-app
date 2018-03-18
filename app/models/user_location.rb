class UserLocation < ApplicationRecord
  belongs_to :user
  belongs_to :location 
  def pretty_start_time
    if start_time
      self.start_time.strftime("%b %e, %l:%M %p")
    else
      start_time
    end
  end
  def pretty_end_time
    if end_time
      self.end_time.strftime("%b %e, %l:%M %p")
    else
      end_time
    end
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
