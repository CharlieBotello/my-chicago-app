Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  
  get '/locations' => 'locations#index'
  post '/locations' => 'locations#create'
  get '/locations/:id' => 'locations#show'
  patch '/locations/:id' => 'locations#update'
  delete 'locations/:id' => 'locations#destroy'

  get '/images' => 'images#index'
  post '/images' => 'images#create'
  get '/images/:id' => 'images#show'
  patch 'images/:id' => 'images#update'
  delete 'images/:id' => 'images#destroy'

  get '/location_stories' => 'location_stories#index'
  post 'location_stories' => 'location_stories#create'
  get '/location_stories/:id' => 'location_stories#show'
  patch '/location_stories/:id' => 'location_stories#update'
  delete '/location_stories/:id' => 'location_stories#destroy'

  get '/stories' => 'stories#index'
  post '/stories' => 'stories#create'
  get '/stories/:id' => 'stories#show'
  patch '/stories/:id' => 'stories#update'
  delete 'stories/:id' => 'stories#destroy'


  post '/users' => 'users#create'

  get 'user_locations' => 'user_locations#index'
  post 'user_locations' => 'user_locations#create'
  get 'user_locations/:id' => 'user_locations#show'
  patch 'user_locations/:id' => 'user_locations#update'
  delete 'user_locations/:id' => 'user_locations#destroy'


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
