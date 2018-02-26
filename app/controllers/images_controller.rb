class ImagesController < ApplicationController
  def index
    @images = Image.all
    render 'index.json.jbuilder'   
  end
  def create
    image = Image.new(
                      location_id: params[:location_id],
                      image_url: params[:image_url]
                      )
    if image.save
      render json: image.as_json
    else
      render json: {errors: image.errors.full_messages}, status: :unprocessable_entity
    end 
  end
  def show
    input_id = params[:id]
    @image = Image.find_by(id: input_id)
    render 'show.json.jbuilder'
  end
  def update
    @image = Image.find_by(id: input_id)
    @image.location_id = params[:location_id] || image.location_id
    @image.image_url = params[:image_url] || image.image_url 

    if image.save
      render json: image.as_json
    else
      render json: {errors: location.errors.full_messages}, status: :unprocessable_entity
    end 
  end
  def destroy
    image = Image.find_by(params[:id])
    image.destroy 
    render json: {message: "Successfully destroyed image id# #{image.id}"}
  end
end
