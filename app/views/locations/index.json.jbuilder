json.array! @locations.each do |location|
  json.id location.id
  json.name location.name
  json.address location.address
  json.latitude location.latitude
  json.longitude location.longitude
  json.updated_at location.friendly_update
  json.year location.year
  if location.images.length > 0
    json.image_url location.images[0].image_url
  end
end