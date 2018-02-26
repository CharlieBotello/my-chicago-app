class StoriesController < ApplicationController
  def index
    @stories = Story.all
    render 'index.json.jbuilder'
  end
  def create
    @story = Story.new(
                        category: params[:category],
                        content: params[:content]
                      )
    if story.save
      render json: story.as_json
    else 
      render json: {errors: story.errors.full_messages}, status: :unprocessable_entity
    end
  end
  def show
    input_id = params[:id]
    @story = Story.find_by(id: input_id)
    render 'show.json.jbuilder'
  end
  def update
    @story = Story.find_by(id: input_id)
    @story.category = params[:category] || story.category
    @story.content = params[:content] || story.content

    if story.save
      render json: story.as_json
    else
      render json: {errors: story.errors.full_messages}, status: :unprocessable_entity
    end
  end
  def destroy
    story = Story.find_by(id: input_id)
    story.destroy 
    render json: {message: "Successfully destroyed story id# #{story.id}"}
  end
end





