const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainers => {
        trainers.forEach(trainer => renderTrainerHTML(trainer))
    })

function renderTrainerHTML(trainer) {
    let div = document.createElement("div")
    div.classList.add("card")
    div.setAttribute("data-id", trainer.id)
    let p = document.createElement("p")
    p.innerText = trainer.name 
    let addPokemonButton = document.createElement("button")
    addPokemonButton.setAttribute("data-trainer-id", trainer.id)
    addPokemonButton.innerText = "Add Pokemon"
    div.appendChild(p)
    div.appendChild(addPokemonButton)
    document.querySelector("main").appendChild(div)

    
    let ul = document.createElement("ul")
    trainer.pokemons.forEach(pokemon => {
        let li = document.createElement("li")
        li.innerText = `${pokemon.nickname} (${pokemon.species})`
        let button = document.createElement("button")
        button.innerText = "Release"
        button.classList.add("release")
        button.setAttribute("data-pokemon-id", pokemon.id)
        li.appendChild(button)
        ul.appendChild(li)
        
        button.addEventListener("click", (e) => {
            let pokemonId = e.target.dataset.pokemonId
            fetch(`${POKEMONS_URL}/${pokemonId}`, {
                method: "DELETE"
            })
            .then(li.remove())
            
        })
    }) 
    div.appendChild(ul)

    addPokemonButton.addEventListener("click", () => {
        fetch(POKEMONS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                trainer_id: trainer.id
            })
        })
            .then(resp => resp.json())
            .then(pokemon => {
                
                if (pokemon.error) {
                    alert(pokemon.error)
                }
                else {
                    let li = document.createElement("li")
                    li.innerText = `${pokemon.nickname} (${pokemon.species})`
                    let button = document.createElement("button")
                    button.innerText = "Release"
                    button.setAttribute("data-pokemon-id", `${pokemon.id}`)
                    button.classList.add("release")
                    li.appendChild(button)
                    ul.appendChild(li) 
                }
                
            })
    })
}






