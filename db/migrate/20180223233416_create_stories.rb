class CreateStories < ActiveRecord::Migration[5.1]
  def change
    create_table :stories do |t|
      t.integer :category
      t.text :content

      t.timestamps
    end
  end
end
