class UserLocation < ApplicationRecord
  belongs_to :user
  belongs_to :location 
  def pretty_start_time
    if start_time
      self.start_time.strftime("%b %d, %Y")
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

  def chicago_image_url
    if images.length > 0
      images[1].image_url
    else
      "http://www.trbimg.com/img-53769950/turbine/ct-per-cab-wars-0518-b-jpg-20140516/2048/2048x1590"
    end
  end

  # def updated_phone_number
  #   phone_number = "+1 #{phone_number}"
  # end
  def as_json
    {
      id: self.id,
      user_id: self.user_id,
      location_id: self.location_id,
      start_time: self.pretty_start_time,
      end_time: self.pretty_end_time,
      phone_number: self.phone_number
    }
  end
end
