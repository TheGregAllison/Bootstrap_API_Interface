let pokemonRepository = (function () {
    let pokemonList = [
        { name: "Pikachu", type: "Electric", height: .4 },
        { name: "Metapod", type: "Bug", height: .7 },
        { name: "Magikarp", type: "Water", height: .9 },
        { name: "Snorlax", type: "Normal", height: 2.1 }
    ];

    const pokemonKeys = Object.keys(pokemonList);
    console.log(pokemonKeys);

    function getAll() {
        return pokemonList;
    }

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

    return {
        getAll: getAll,
        add: add
    };
})();


pokemonRepository.getAll().forEach(function (pokemon) {
    document.write("Name: " + pokemon.name + " ");
    if (pokemon.height > 1) {
        document.write("- Wow! That's a large Pokemon! ")
    }
    document.write("<br> Type: " + pokemon.type + "<br><br>");
});

let newPokemon = {
    name: "Charmander", type: "fire", height: .6
};

pokemonRepository.add(newPokemon);

pokemonRepository.getAll().forEach(function (item) {
    document.write("Name: " + item.name + "<br>");
});

