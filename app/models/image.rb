class Image < ApplicationRecord
  belongs_to :location

  def as_json
    {
      id: self.id,
      location_id: self.location_id,
      image_url: self.image_url
    }
  end
end
