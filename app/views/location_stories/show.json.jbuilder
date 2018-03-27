json.partial! @user_location, partial: 'user_location', as: :user_location


json.id @location_story.id
json.location_id @location_story.location_id
json.story_id @location_story.story_id 
json.source @location_story.source