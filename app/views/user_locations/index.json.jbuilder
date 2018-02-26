json.array! @user_locations.each do |user_location|
  json.id user_location.id
  json.user_id user_location.user_id
  json.location_id user_location.location_id
  json.start_time user_location.start_time
  json.end_time user_location.end_time
end 

