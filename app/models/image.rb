class Image < ApplicationRecord
  # has_attached_file :image_urls, {medium: "600x400>", large: "1200X1000>"}
    
  # validates_attachment :image_urls,
  #   content_type: {
  #     content_type: ["image/jpeg", "image/gif", "image/png"]
  #   }


  belongs_to :location

  # def as_json
  #   {
  #     id: self.id,
  #     location_id: self.location_id,
  #     image_url: self.image_url
  #   }
  # end
end
