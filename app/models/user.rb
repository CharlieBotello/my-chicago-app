class User < ApplicationRecord
  has_secure_password
  
  has_many :user_locations
  has_many :locations, through: :user_locations

  validates :name, presence: true 
  validates :email, presence: true, uniqueness: true
  
end
