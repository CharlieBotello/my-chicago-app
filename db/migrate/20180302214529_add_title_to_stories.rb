class AddTitleToStories < ActiveRecord::Migration[5.1]
  def change
    add_column :stories, :title, :string
  end
end
