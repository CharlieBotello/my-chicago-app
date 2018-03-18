class Story < ApplicationRecord
  has_many :location_stories
  enum category: {origins: 0, chicago: 1, world: 2}

  def as_json
    {
      id: self.id,
      category: self.category,
      content: self.content
    }
  end
end
