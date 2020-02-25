require 'faker'
require 'securerandom'

class PokemonsController < ApplicationController

    def create 
        @trainer = Trainer.find_by(id: params[:pokemon][:trainer_id])
        if @trainer.pokemons.count < 6 
            pokemon = @trainer.pokemons.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer_id: @trainer.id)
            render json: pokemon
        else 
            render json: {error: "6 Pokemons Only per Column!"}
        end
    end

    def destroy 
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
        render json: pokemon
    end

    private 

    def pokemon_params
        params.require(:pokemon).permit(:nickname, :species, :trainer_id)
    end

end
