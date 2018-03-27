class Image < ApplicationRecord
  # has_attached_file :image_urls, {medium: "600x400>", large: "1200X1000>"}
    
  # validates_attachment :image_urls,
  #   content_type: {
  #     content_type: ["image/jpeg", "image/gif", "image/png"]
  #   }


  belongs_to :location


  # def chicago_image_url
  #   if images.length > 0
  #     images[1].image_url
  #   else
  #     "http://www.trbimg.com/img-53769950/turbine/ct-per-cab-wars-0518-b-jpg-20140516/2048/2048x1590"
  #   end
  # end

  # def as_json
  #   {
  #     id: self.id,
  #     location_id: self.location_id,
  #     image_url: self.image_url
  #   }
  # end
end
