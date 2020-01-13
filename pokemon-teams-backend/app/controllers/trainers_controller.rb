class TrainersController < ApplicationController

    def index
        @trainers = Trainer.trainer_list_with_pokemons

        render json: @trainers, except: [:created_at, :updated_at]
    end
end
