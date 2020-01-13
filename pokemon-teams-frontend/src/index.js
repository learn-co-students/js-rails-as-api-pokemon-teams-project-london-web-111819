//HELPER APIs
function post(URI,newObj){
    let configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(newObj)
      };
    return fetch(URI, configObj)
        .then(response=>response.json())
        .catch(error=>showError(error));
    }

function destroy(URI,id){
    let configObj = {
        method: "DELETE"
    }
    return fetch(`${URI}/${id}`,configObj).then(response=>response.json()).catch(error=>showError(error))
}

function get(URI){
    return fetch(URI).then(response=>response.json()).catch(error=>showError(error))
}

//CONSTANTS
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const MAIN = document.querySelector('main')

//FUNCTIONS
function showError(error){
    console.log(error.message)
}

function postPokemonAndRender(id){
    let newObj = {
        trainer_id: id
    }
    console.log("inside postPokemonAndRender(id)")
    post(POKEMONS_URL,newObj).then(newPokemonObj=>renderNewPokemon(newPokemonObj))
}

function destroyPokemonAndRender(id){
    destroy(POKEMONS_URL,id).then(deletedObj=>renderDeletedPokemon(deletedObj))
}

function renderDeletedPokemon(deletedObj){
    document.getElementById(deletedObj.id).parentNode.remove()
}

function renderTrainer(trainer){
    let newDiv = document.createElement('div')
    newDiv.classList.add('card')
    newDiv.innerText = trainer.name
    let newAddPokemonButton = document.createElement('button')
    newAddPokemonButton.id = trainer.id
    newAddPokemonButton.innerText = "Add Pokemon"
    newAddPokemonButton.addEventListener("click",function(event){
        addPokemon(event)
    })
    let newUl = document.createElement('ul')
    newUl.id = `trainer-id-${trainer.id}`
    trainer.pokemons.forEach(pokemon=>{
        let newLi = document.createElement('li')
        newLi.innerText = pokemon.nickname
        let releaseButton = document.createElement('button')
        releaseButton.id = pokemon.id
        releaseButton.innerText = "Release"
        releaseButton.addEventListener("click",releasePokemon)
        // releaseButton.addEventListener("click",function(event){
        //     releasePokemon(event)
        // })
        newLi.appendChild(releaseButton)
        newUl.appendChild(newLi)
    })
    newDiv.append(newAddPokemonButton,newUl)
    MAIN.appendChild(newDiv)
}

function addPokemon(event){
    postPokemonAndRender(event.target.id) //trainer_id
}

function renderNewPokemon(newPokemonObj){
    let newLi = document.createElement('li')
    newLi.innerText = newPokemonObj.nickname
    let releaseButton = document.createElement('button')
    releaseButton.id = newPokemonObj.id
    releaseButton.innerText = "Release"
    releaseButton.addEventListener("click",releasePokemon)
    // releaseButton.addEventListener("click",function(event){
    //     releasePokemon(event)
    // })
    newLi.appendChild(releaseButton)
    idToBeFound = `trainer-id-${newPokemonObj.trainer_id}`
    let targetElementToAddTo = document.getElementById(idToBeFound)
    targetElementToAddTo.appendChild(newLi)
}

function releasePokemon(event){
    destroy(POKEMONS_URL,event.target.id).then(deletedObj=>renderDeletedPokemon(deletedObj))
}

function getTrainersAndTheirPokemonsAndRenderThemOnPage(){
    get(TRAINERS_URL).then(trainers=>trainers.forEach(renderTrainer))
}

//LOADERS/EVENTLISTENERS
getTrainersAndTheirPokemonsAndRenderThemOnPage()
