class TrainersController < ApplicationController

    def index 
        trainers = Trainer.all 
         options = {
           :include => [:pokemons]
        }
        render json: trainers.to_json(:include => {:pokemons => {only: [:nickname, :species, :id, :trainer_id]}}, :except => [:created_at, :updated_at])
    end

end
