class LocationStoriesController < ApplicationController
  def index
    @location_stories = LocationStory.all 
    render 'index.json.jbuilder'
  end
  def show
    input_id = params[:id]
    @location_story = LocationStory.find_by(id: input_id)    
    render 'show.json.jbuilder'
  end
  def create
    location_story = LocationStory.new(
                                        location_id: params[:location_id],
                                        story_id: params[:story_id],
                                        source: params[:source]
                                      )
    if location_story.save
      render json: location_story.as_json
    else
      render json: {errors: location_story.errors.full_messages}, status: :unprocessable_entity
    end
  end
  def update
    @location_story = LocationStory.find_by(id: input_id)
    @location_story.location_id = params[:location_id] || location_story.location_id
    @location_story.story_id = params[:story_id] || location_story.story_id
    @location_story.source = params[:source] || location_story.source

    if location_story.save
      render json: location_story.as_json
    else
      render json: {errors: location_story.errors.full_messages}, status: :unprocessable_entity
    end 
  end
  def destroy
    location_story = LocationStory.find(params[:id])
    location_story.destroy
    render json: {message: "Succesfully destroyed location_story id# #{location_story.id}"}
  end
end


    if location_story.save
      render json: location_story.as_json
    else
      render json: {errors: location_story.errors.full_messages}, status: :unprocessable_entity
    end 
  end
  def destroy
    location_story = LocationStory.find(params[:id])
    location_story.destroy
    render json: {message: "Succesfully destroyed location_story id# #{location_story.id}"}
  end
end




