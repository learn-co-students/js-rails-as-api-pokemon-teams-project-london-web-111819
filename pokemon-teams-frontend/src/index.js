// document.addEventListener("DOMContentLoaded", function() {
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

// fecth functions 

function get(url){
    return fetch(url)
    .then((response) => response.json())
}

function post(url,bodyOject){
    return fetch(url,{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(bodyOject)
    })
    .then((response) => response.json())
}

function destroy(url, id){
    return fetch(`${url}/${id}`, {
        method:"DELETE"
    })
}



// funtions

function getAllTrainers(){
    get(TRAINERS_URL)
    .then((trainers)=> trainers.forEach(renderTrainer))
}

function renderTrainer(trainer){
    let div = document.createElement('div')
    div.className = "card"
    div.setAttribute("data-id", trainer.id)
    let p = document.createElement('p')
    p.setAttribute("data-trainer-id", trainer.id)
    p.innerText = trainer.name
    let addButton = document.createElement('button')
    addButton.innerText = "Add Pokemon"
    addButton.addEventListener('click', () => addPokemon(div))
    let ul = document.createElement('ul')
    renderPokemons(trainer.pokemons, ul)
    div.append(p, addButton, ul)
    main.append(div)
}

function renderPokemons(pokemonList, listElement){
    for(pokemon of pokemonList){
        let li = document.createElement('li')
        li.innerText = `${pokemon.nickname} (${pokemon.species})`
        let releaseButton = document.createElement('button')
        releaseButton.innerText="Release"
        releaseButton.className = "release"
        releaseButton.setAttribute("data-pokemon-id", pokemon.id)
        releaseButton.addEventListener('click', releasePokemon)
        li.appendChild(releaseButton)
        listElement.appendChild(li)
    }
}

function renderNewPokemon(pokemon){
    let div = document.querySelector(`[data-id='${pokemon.trainer_id}']`)
    let ul = div.querySelector("ul")
    let li = document.createElement('li')
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    let releaseButton = document.createElement('button')
    releaseButton.innerText="Release"
    releaseButton.className = "release"
    releaseButton.setAttribute("data-pokemon-id", pokemon.id)
    releaseButton.addEventListener('click', releasePokemon)
    li.appendChild(releaseButton)
    ul.appendChild(li)
}

function addPokemon(div){
    let bodyOject = {
       trainer_id: parseInt(div.getAttribute("data-id"))
    }

    post(POKEMONS_URL, bodyOject)
    .then((pokemon) => renderNewPokemon(pokemon)) 
}

function releasePokemon(e){
    let id = parseInt(e.target.getAttribute("data-pokemon-id"))
    destroy(POKEMONS_URL,id)
    .then(() => e.target.parentNode.remove())
}




// call functions

getAllTrainers()

// })
