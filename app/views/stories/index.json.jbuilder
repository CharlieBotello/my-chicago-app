json.array! @stories.each do |story|
  json.id story.id
  json.category story.category
  json.title story.title
  json.content story.content

end 
