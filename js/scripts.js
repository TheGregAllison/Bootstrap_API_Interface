let pokemonList = [
    {name: "Pikachu", type: "Electric", height: .4},
    {name: "Metapod", type: "Bug", height: .7},
    {name: "Magikarp", type: "Water", height: .9},
    {name: "Snorlax", type: "Normal", height: 2.1}
];
//This for loop runs through the array and displays the Pokemon, their height and a special note about them in the DOM. 
for (let i = 0; i < pokemonList.length; i++){
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + " m) " )
    // This if statement adds a note in the DOM about the pokemon's size. 
    if (pokemonList[i].height >= 1){
        document.write("- Now that's a large Pokemon.")
    }
    document.write("<br>")
}

