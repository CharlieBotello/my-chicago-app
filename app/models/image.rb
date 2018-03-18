class Image < ApplicationRecord
  # has_attached_file :image_url, {medium: "300x300>", large: "1200X1200>"}
    
  # validates_attachment :image_url,
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
