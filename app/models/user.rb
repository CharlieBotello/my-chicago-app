class User < ApplicationRecord
  has_secure_password

  has_many :user_locations
  has_many :locations, through: :user_locations


  
end
