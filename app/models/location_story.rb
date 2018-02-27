class LocationStory < ApplicationRecord
  belongs_to :location 
  belongs_to :story

  def as_json
    {
      id: self.id,
      location_id: self.location_id,
      story_id: self.story_id,
      source: self.source
    }
  end
end
