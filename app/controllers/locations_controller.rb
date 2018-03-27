class LocationsController < ApplicationController
    before_action :authenticate_user, only: [:create, :update, :destroy]
  def index
    @locations = Location.all.limit(17)
    search_name = params[:search_name]
    search_year = params[:search_year]

    # if search_name || search_year
    #   @locations = @locations.where("name iLIKE ? and year iLike ?",
    #                               "%#{search_name}%",
    #                               "%#{search_year}%"
    #                               )
    # end
   puts params[:search_name]
    if search_name != nil && search_name != ""
          # @locations = Location.where("name iLIKE ? OR year iLIKE ?", 
          #                          "%#{search_name}%", 
          #                          "%#{search_year}%")

             @locations = Location.where(name:search_name)
    end
    if search_year != nil && search_year != ""
          # @locations = Location.where("name iLIKE ? OR year iLIKE ?", 
          #                          "%#{search_name}%", 
          #                          "%#{search_year}%")

             @locations = Location.where("year iLIKE ? ",
                                  "%#{search_year}%")
    end



    sort_attribute = params[:sort]
    if sort_attribute
      @locations = @locations.order(sort_attribute)
    else
    end   
    puts @locations    
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
    puts @location.get_stories_origins.length
    render 'show.json.jbuilder'   
  end

  def random
    input_id = params[:id].random 
    @location = Location.find_by(id: input_id)
    puts @location.get_stories_origins.length
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




