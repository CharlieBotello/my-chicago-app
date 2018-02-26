class Story < ApplicationRecord
  has_many :location_stories
  enum category: {entertaintment: 0, current_event: 1, year: 2}

  def as_json
    {
      id: self.id,
      category: self.category,
      content: self.content
    }
  end
end
