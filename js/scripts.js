let pokemonRepository = (function () {

    //Empty Array, assigns API URL with pokemon API. 
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //Function that simply returns the above array pokemonList
    function getAll() {
        return pokemonList;
    }

    // This function provides validation for newly added items to the pokemonList array. 
    function add(newItem) {
        if (typeof newItem === "object" && typeof newItem !== null) {
            if (typeof Object.keys(newItem) === typeof Object.keys(pokemonKeys)) {
                pokemonList.push(newItem);
            }
        }
        else {
            console.log("Data type must be an object");
        }
    }

    // This function creates li and button elements within the pokemon-list class on the index.html page. Additionally, this includes a local function that logs the pokemon's name when its corresponding button is clicked. 
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let pokemonItem = document.createElement("li");
        let pokemonButton = document.createElement("button");
        pokemonButton.innerText = pokemon.name;
        pokemonButton.classList.add("button-class");
        pokemonItem.appendChild(pokemonButton);
        pokemonList.appendChild(pokemonItem);
        pokemonButton.addEventListener("click", function () {
            showDetails(pokemon)
        })
    }

    function showDetails(pokemon) {
        console.log(pokemon.name)
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                addListItem(pokemon);
            });
        }).catch(function (e) {
            console.error(e)
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response)
         {
            return response.json();
         }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
         }).catch(function (e){
            console.error(e);
         });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function (){
            console.log(pokemon);
        });
    }

    //pokemonRepository function return values
    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();


pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});