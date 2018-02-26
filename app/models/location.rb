class Location < ApplicationRecord
  has_many :images
  has_many :location_stories
  has_many :stories, through: :location_stories

  def friendly_update
    updated_at.strftime("%b %d, %Y")
  end
  def as_json
    {
      id: self.id,
      name: self.name,
      address: self.address,
      latitude: self.latitude,
      longitude: self.longitude,
      updated_at: self.friendly_update,
      year: self.year
    }
  end
end
