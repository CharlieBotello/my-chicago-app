class LocationsController < ApplicationController
    before_action :authenticate_user, only: [:create, :update, :destroy]
  def index
    @locations = Location.all
    search_term = params[:search]
    if search_term
      @locations = @locations.where("name iLIKE ?",
                                  "%#{search_term}%"
                                  )
    else
    end
    sort_attribute = params[:sort]
    if sort_attribute
      @locations = @locations.order(sort_attribute)
    else
    end       
    render 'index.json.jbuilder'
  end

  def create
    if current_user && current_user.admin
      @location = Location.new(
                              name: params[:name],
                              address: params[:address],
                              latitude: params[:latitude],
                              longitude: params[:longitude],
                              year: params[:year]
                              )
      if @location.save
        render json: @location.as_json
      else
        render json: {errors: @location.errors.full_messages}, status: :unprocessable_entity
      end
    else 
      render json: {message: "You are not Authorized"}, status: :unauthorized
    end
  end

  def show
    input_id = params[:id]
    @location = Location.find_by(id: input_id)
    render 'show.json.jbuilder'
  end
  def update
    if current_user && current_user.admin
      input_id = params[:id]
      @location = Location.find_by(id: input_id)
      @location.name = params[:name] || @location.name
      @location.address = params[:address] || @location.address
      @location.latitude = params[:latitude] || @location.latitude
      @location.longitude = params[:longitude] || @location.longitude
      @location.year = params[:year] || @location.year


      if @location.save
        render json: @location.as_json
      else
        render json: {errors: @location.errors.full_messages}, status: :unprocessable_entity
      end 
    else 
      render json: {message: "You are not Authorized"}, status: :unauthorized
    end
  end
  def destroy
    if current_user && current_user.admin
      location = Location.find(params[:id])
      location.destroy 
      render json: {message: "Successfully destroyed location id# #{location.id}"}
      
    else
      render json: {message: "You are not Authorized"}, status: :unauthorized
    end
  end
end




