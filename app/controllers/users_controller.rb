class UsersController < ApplicationController
  def create
    user = User.new(
                    name: params[:name],
                    email: params[:email],
                    password: params[:password],
                    password_confirmation: params[:password_confirmation]
                    )
    # if user.save
    #   render json: {message: "User created"}, status: :confirmed 
    # else
    #   render json: {errors: user.errors.full_messages}, status: :bad_request
    # end 
    user.save
    render  json: user.as_json
  end
end
