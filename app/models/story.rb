class Story < ApplicationRecord
  has_many :location_stories
  enum category: {origins: 0, chicago_event: 1, world_event: 2}

  def as_json
    {
      id: self.id,
      category: self.category,
      content: self.content
    }
  end
end
