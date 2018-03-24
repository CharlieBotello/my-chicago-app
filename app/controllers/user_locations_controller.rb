require 'rubygems'
require 'twilio-ruby'

class UserLocationsController < ApplicationController
  before_action :authenticate_user
  
  def index
    @user_locations = current_user.user_locations 
    

    render 'index.json.jbuilder'    
  end
  def create
    @user_location = UserLocation.new(
                                    user_id: current_user.id,
                                    location_id: params[:location_id],
                                    start_time: params[:start_time].to_datetime,
                                    # ,
                                    # end_time: params[:end_time].to_datetime,
                                    phone_number: params[:phone_number]
                                    )
    if @user_location.save
      render 'show.json.jbuilder'
      # render json: @user_location.as_json
    account_sid = 'AC0c99424d7f274ba0a6e6c7d432fd5586'
    auth_token = '86be9485e114facd530d29f2f67cbaf8'
    client = Twilio::REST::Client.new account_sid, auth_token


    user_phone = @user_location.phone_number

    from = '+13462201025' # Your Twilio number
    to = "+1#{user_phone}" # Your mobile phone number

    pretty_start_time = @user_location.start_time.strftime("%e%b%Y")



    client.messages.create(
    from: from,
    to: to,
    body: "You are scheduled at #{pretty_start_time}!"
    )
    else
      render json: {errors: @user_location.errors.full_messages}, status: :unprocessable_entity 
    end
  end

  def show
    input_id = params[:id]
    @user_location = UserLocation.find_by(id: input_id)
    render 'show.json.jbuilder'
  end
  def update
    @user_location = UserLocation.find_by(id: input_id)
    @user_location.user_id = params[:user_id] || @user_location.user_id
    @user_location.location_id = params[:location_id] || @user_location.location_id
    @user_location.start_time = params[:start_time] || @user_location.start_time
    @user_location.end_time = params[:end_time] || @user_locations.end_time
    @user_location.phone_number = params[:phone_number] || @user_location.phone_number

    if user_location.save
      render json: @user_location.as_json
    else
      render json: {errors: @user_location.errors.full_messages}, status: :unprocessable_entity
    end
  end
  def destroy
    user_location = UserLocation.find(params[:id])
    location.destroy
    render json: {message: "Successfully destroyed User location id##{user_location}"}
  end
end





