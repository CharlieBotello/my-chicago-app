class Location < ApplicationRecord
  has_many :images
  has_many :location_stories
  has_many :stories, through: :location_stories

  def friendly_update
    updated_at.strftime("%b %d, %Y")
  end


  def get_stories_origins
    stories_origins = []
    stories.each do |story|
      if story.category == "origins"

        stories_origins << story
      end
    end
    stories_origins
  end

  def get_stories_chicago
    stories_chicago = []
    stories.each do |story|
      if story.category == "chicago"
        stories_chicago << story
      end 
    end
    stories_chicago
  end

  def get_stories_world
    stories_world = []
    stories.each do |story|
      if story.category == "world"
        stories_world << story
      end 
    end 
    stories_world
  end 

  def origins_image_url
    if images.length > 0
      images[0].image_url
    else
      "http://www.trbimg.com/img-53769950/turbine/ct-per-cab-wars-0518-b-jpg-20140516/2048/2048x1590"
    end
  end
  def chicago_image_url
    if images[1]
    images[1].image_url
    else
      "http://www.trbimg.com/img-53769950/turbine/ct-per-cab-wars-0518-b-jpg-20140516/2048/2048x1590"
    end

  end 

  def world_image_url
    if images[2]
    images[2].image_url
    else 
      "http://www.trbimg.com/img-53769950/turbine/ct-per-cab-wars-0518-b-jpg-20140516/2048/2048x1590"
    end
  end 

  # def get_stories_world_title
  #   stories_world = []
  #   stories.each do 
  #     if story.categoru == "world"
  #       stories_world_title << 
  # end 
  # def as_json
  #   {
  #     id: self.id,
  #     name: self.name,
  #     address: self.address,
  #     latitude: self.latitude,
  #     longitude: self.longitude,
  #     updated_at: self.friendly_update,
  #     year: self.year
  #   }
  # end
end
