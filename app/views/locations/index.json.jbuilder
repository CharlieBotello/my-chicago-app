# json.array! @locations, partial: 'location', as: :location





json.array! @locations.each do |location|
  json.id location.id
  json.name location.name
  json.address location.address
  json.latitude location.latitude
  json.longitude location.longitude
  json.updated_at location.friendly_update
  json.year location.year

  json.origins_url location.origins_image_url
  json.chicago_url location.chicago_image_url
  json.world_url location.world_image_url
end