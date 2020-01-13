require 'faker'

class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons)
    end

    def show
        pokemon = Pokemon.all.find_by(id: params[:id])
        options = {
            include: [:trainer, :nickname, :species]
        }
        render json: PokemonSerializer.new(pokemon, options)
    end

    def create
        pokemon = Pokemon.new(pokemon_params)
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon.nickname = name
        pokemon.species = species
        pokemon.save
        render json: pokemon
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy
        render json: pokemon
    end

    private

    def pokemon_params
        params.require(:pokemon).permit(:trainer_id)
    end
end
