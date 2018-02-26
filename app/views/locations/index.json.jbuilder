json.array! @locations.each do |location|
  json.id location.id
  json.name location.name
  json.address location.address
  json.latitude location.latitude
  json.longitude location.longitude
  json.updated_at location.friendly_update
  json.year location.year
end