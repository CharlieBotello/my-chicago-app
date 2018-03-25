json.id @location.id 
json.name @location.name
json.address @location.address
json.latitude @location.latitude
json.longitude @location.longitude
json.updated_at @location.friendly_update
json.image_url @location.first_image_url
json.year @location.year

# json.title @location.get_stories_world.title.as_json
# json.stories @location.location_stories.as_json
# json.stories @location.stories.as_json


json.stories_origins @location.get_stories_origins.as_json

json.stories_chicago @location.get_stories_chicago.as_json

json.stories_world @location.get_stories_world.as_json

# json.title @location.story