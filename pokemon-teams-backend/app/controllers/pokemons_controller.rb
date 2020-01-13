class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all

        render json: pokemons, include:[trainer:{except:[:updated_at, :created_at]}], except:[:updated_at, :created_at]

    end 

    def show
        pokemon = Pokemon.find_by(id: params[:id])

        render json: pokemon, include:[trainer:{except:[:updated_at, :created_at]}], except:[:updated_at, :created_at]
    end

    def new

    end 

    def create
        pokemon = Pokemon.new
        pokemon.trainer_id = params[:trainer_id]
        pokemon.nickname = Faker::Name.first_name
        pokemon.species = Faker::Games::Pokemon.name
        pokemon.save 

        render json: pokemon, include:[trainer:{except:[:updated_at, :created_at]}], except:[:updated_at, :created_at]
    end 

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.delete
    end 
    

    private

    def post_params
        params.require(:pokemon).permit(:nickname,:species,:trainer_id)
    end 
end
