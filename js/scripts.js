let pokemonRepository = (function () {

    //Pokemon repository array with objects for example pokemon
    let pokemonList = [
        { name: "Pikachu", type: "Electric", height: .4 },
        { name: "Metapod", type: "Bug", height: .7 },
        { name: "Magikarp", type: "Water", height: .9 },
        { name: "Snorlax", type: "Normal", height: 2.1 }
    ];

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
    function addListItem(pokemon){
        let pokemonList = document.querySelector(".pokemon-list");
        let pokemonItem = document.createElement("li");
        let pokemonButton = document.createElement("button");
        pokemonButton.innerText = pokemon.name;
        pokemonButton.classList.add("button-class");
        pokemonItem.appendChild(pokemonButton);
        pokemonList.appendChild(pokemonItem);
        pokemonButton.addEventListener("click", function showDetails(){
            console.log(pokemon.name)
        });   
    }
    
    //pokemonRepository function return values
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    };
})();


pokemonRepository.getAll().forEach(function(pokemon){
pokemonRepository.addListItem(pokemon);
});