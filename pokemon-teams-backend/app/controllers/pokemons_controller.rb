class PokemonsController < ApplicationController

    def index
        @pokemons = Pokemon.all
        render json: @pokemons, except: [:created_at, :updated_at]
    end

    def create
        @pokemon = Pokemon.new(pokemon_params)
        @pokemon.nickname = Faker::Name.first_name
        @pokemon.species = Faker::Games::Pokemon.name
        @pokemon.save
        render json: @pokemon, except: [:created_at, :updated_at]
    end

    def destroy
        @pokemon = Pokemon.find(params[:id])
        @pokemon.destroy
        render json: @pokemon, except: [:created_at, :updated_at] 
    end

    def pokemon_params
        params.require(:pokemon).permit(:trainer_id)
    end
    
end
