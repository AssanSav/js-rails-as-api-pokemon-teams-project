const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
// document.addEventListener()


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
  }) 
    div.appendChild(ul)
}


function addPokemons(event) {
  let trainerId = event.target.dataset.trainerId
    fetch(POKEMONS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        trainer_id: trainerId
      })
    })
      .then(resp => resp.json())
      .then(pokemon => {
        console.log("e", event)
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
          event.target.parentElement.querySelector("ul").appendChild(li)
        }
    })
}

function handleDelete(event) {
  let pokemonId = event.target.dataset.pokemonId
  fetch(`${POKEMONS_URL}/${pokemonId}`, {
    method: "DELETE"
  })
    .then(resp => resp.json())
    .then(json => {
      event.target.parentElement.remove()
  })              
}

function attachListenners() {
  document.querySelector("main").addEventListener("click", (event) => {
      let buttonText = event.target.innerText
      if (buttonText === "Release") {
          handleDelete(event)  
      } else if (buttonText === "Add Pokemon"){
        addPokemons(event)
      }
  })
}
attachListenners()





