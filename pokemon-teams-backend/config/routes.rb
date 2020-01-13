Rails.application.routes.draw do
  # resources :pokemons
  # resources :trainers
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/trainers' => 'trainers#index', as: 'trainers'
  get '/trainers/:id' => 'trainers#show', as: 'trainer'
  get '/pokemons' => 'pokemons#index', as: 'pokemons'
  get '/pokemons/:id' => 'pokemons#show', as: 'pokemon'
  post '/pokemons' => 'pokemons#create', as: 'new_pokemon'
  delete '/pokemons/:id' => 'pokemons#destroy', as: 'delete_pokemon'
end
