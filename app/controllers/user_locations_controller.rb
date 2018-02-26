class UserLocationsController < ApplicationController
  def index
    @user_locations = UserLocation.all 
    render 'index.json.jbuilder'    
  end
  def create
    user_location = UserLocation.new(
                                    user_id: params[:user_id],
                                    location_id: params[:location_id],
                                    start_time: params[:start_time],
                                    end_time: params[:end_time]
                                    )
    if user_location.save
      render json: user_location.as_json
    else
      render json: {errors: user_location.errors.full_messages}, status: :unprocessable_entity 
    end
  end
  def show
    input_id = params[:id]
    @user_location = UserLocation.find_by(id: input_id)
    render 'show.json.jbuilder'
  end
  def update
    @user_location = UserLocation.find_by(id: input_id)
    @user_location.user_id = params[:user_id] || user_location.user_id
    @user_location.location_id = params[:location_id] || user_location.location_id
    @user_location.start_time = params[:start_time] || user_location.start_time
    @user_location.end_time = params[:end_time] || user_locations.end_time

    if location.save
      render json: user_location.as_json
    else
      render json: {errors: user_location.errors.full_messages}, status: :unprocessable_entity
    end
  end
  def destroy
    user_location = UserLocation.find(params[:id])
    location.destroy
    render json: {message: "Successfully destroyed User location id##{user_location}"}
  end
end





