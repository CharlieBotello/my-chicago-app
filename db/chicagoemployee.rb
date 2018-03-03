chicagoemployee.rb

require "unirest"

response = Unirest.get("https://data.cityofchicago.org/resource/xzkq-xp2w.json")
employees = response.body

employees.each do |employee|
  puts "Name: #{employee['name']}"
  puts "Title: #{employee['job_titles']}"
  puts ""
  puts "-" * 50
  puts ""
end