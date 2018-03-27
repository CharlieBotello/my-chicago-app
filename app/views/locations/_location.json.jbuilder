json.id location.id
json.name location.name
json.address location.address
json.latitude location.latitude
json.longitude location.longitude
json.updated_at location.friendly_update
json.year location.year

json.first_image_url location.first_image_url
json.second_image_url location.second_image_url
json.third_image_url location.third_image_url



json.stories location.stories



# json.stories do
#   json.array! location.stories, partial: 'stories/story', as: :story
# end