// GLOBAL VARIABLES / CONSTANTS

const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons/`
const trainerCard = document.querySelector('.card')

// API FUNCTIONS

function get(url) {
    return fetch(url)
    .then(function(response) {
        return response.json()
    })
}

function post(url, bodyObject) {
    return fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(bodyObject)
    })
    .then(function(response) {
        return response.json()
    })
}

function destroy(url, id) {
    return fetch(`${url}${id}`, {
        method: 'DELETE'
    })
}


// FUNCTIONS

function createTrainerCard(trainer) {
    let div = document.createElement('div')
    div.classList.add('card')
    div.setAttribute('data-id', trainer.id)
    let trainerName = document.createElement('p')
    trainerName.textContent = trainer.attributes.name
    let addBtn = document.createElement('button')
    addBtn.textContent = 'Add Pokemon'
    let ul = document.createElement('ul')
    getListOfPokemonsAndRender(trainer.attributes.pokemons, ul)
    div.append(trainerName, addBtn, ul)
    document.querySelector('main').appendChild(div)
    addBtn.addEventListener('click', postToPokemonsAndRender)
}

function getThenRenderTrainerCard() {
    get(TRAINERS_URL)
    .then(function(trainers) {
        trainers.data.forEach(function(trainer) {
            createTrainerCard(trainer)
        })
    })
}

function getListOfPokemonsAndRender(pokemons, ul) {
    pokemons.forEach(function(pokemon) {
        let li = document.createElement('li')
        li.textContent = `${pokemon.nickname} - (${pokemon.species})`
        let releaseBtn = document.createElement('button')
        releaseBtn.classList.add('release')
        releaseBtn.textContent = 'Release'
        li.appendChild(releaseBtn)
        ul.appendChild(li)
        releaseBtn.addEventListener('click', function(event) {
            removePokemonAndUpdateList(pokemon.id, event)
        })
    })
}

function postToPokemonsAndRender(event) {
    let bodyObject = {
        trainer_id: event.target.parentElement.dataset.id
    }
    post(POKEMONS_URL, bodyObject)
    .then(function(pokemon) {
        let emptyArr = []
        emptyArr.push(pokemon)
        getListOfPokemonsAndRender(emptyArr, event.target.parentElement.children[2])
    })
}

function removePokemonAndUpdateList(id, event) {
    destroy(POKEMONS_URL, id)
    event.target.parentElement.remove()
}



// EVENT LISTENERS
document.body.onload = getThenRenderTrainerCard

