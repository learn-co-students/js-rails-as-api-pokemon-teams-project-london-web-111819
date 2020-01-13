class Trainer < ApplicationRecord
    has_many :pokemons

    def self.trainer_list_with_pokemons
        trainer_hash = {}
        results_array = []
        Trainer.all.each{|trainer|
            trainer_hash[:id] = trainer.id
            trainer_hash[:name] = trainer.name
            trainer_hash[:pokemons] = trainer.pokemons
            results_array << trainer_hash
            trainer_hash = {}
        }
        return results_array
    end
end
