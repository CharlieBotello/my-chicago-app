class CreateLocationStories < ActiveRecord::Migration[5.1]
  def change
    create_table :location_stories do |t|
       t.integer :location_id
       t.integer :story_id
       t.string :source
      
      t.timestamps
    end
  end
end
