let pokemonRepository = (function () {
  //Empty Array, assigns API URL with pokemon API, and establishes the query selector for the global ".modalContainer" .
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = document.querySelector(".modal-container");

  // This function makes the modal visible on the webpage and adds the modal elements (Title/Pokemon name, Pokemon image, Pokemon height, Pokemon types, and close (X) button)
  function showModal(pokemon) {
    modalContainer.innerHTML = " ";

    let modal = document.createElement("div");
    modal.classList.add("modal");
    modal.classList.add("modal-content");

    let closeButton = document.createElement("button");
    closeButton.classList.add("modal-close");
    closeButton.innerText = "X";
    closeButton.addEventListener("click", hideModal);

    let titleElement = document.createElement("h2");
    titleElement.classList.add("modal-header");
    titleElement.classList.add("text-left");
    firstLetter = pokemon.name.charAt(0).toUpperCase();
    restOfName = pokemon.name.slice(1);
    capitalizedName = firstLetter + restOfName;
    titleElement.innerText = capitalizedName;

    let heightElement = document.createElement("p");
    heightElement.classList.add("modal-body");
    heightElement.classList.add("text-left");
    heightElement.innerText = "Height: " + pokemon.height;

    let typeElement = document.createElement("p");
    typeElement.classList.add("modal-body");
    typeElement.classList.add("text-left");
    if (pokemon.types.length < 2) {
      typeElement.innerText = "Type: " + pokemon.types;
    } else {
      typeElement.innerText = "Types: " + pokemon.types.join(", ");
    }

    let pokemonImage = document.createElement("img");
    pokemonImage.setAttribute("src", pokemon.imageUrl);
    pokemonImage.setAttribute("width", 150);
    pokemonImage.classList.add("center-block");
    pokemonImage.classList.add("image-center");

    modal.appendChild(closeButton);
    modal.appendChild(pokemonImage);
    modal.appendChild(titleElement);
    modal.appendChild(heightElement);
    modal.appendChild(typeElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");
  }

  // This function creates li and button elements within the pokemon-list class on the index.html page. Additionally, this includes a local function that logs the pokemon's name when its corresponding button is clicked.
  function addListItem(pokemon) {
    loadDetails(pokemon);

    let pokemonList = document.querySelector(".pokemon-list");
    let pokemonItem = document.createElement("li");
    let pokemonButton = document.createElement("button");

    firstLetter = pokemon.name.charAt(0).toUpperCase();
    restOfName = pokemon.name.slice(1);
    capitalizedName = firstLetter + restOfName;
    pokemonButton.innerText = capitalizedName;
    pokemonButton.classList.add("list-group-item");
    pokemonItem.classList.add("mt-2");
    pokemonButton.classList.add("btn-block");
    pokemonButton.classList.add("col-10");
    pokemonButton.classList.add("mx-auto");
    pokemonItem.appendChild(pokemonButton);
    pokemonList.appendChild(pokemonItem);
    pokemonButton.addEventListener("click", function () {
      showModal(pokemon);
    });
  }

  // This function loads the API information and assigns the results of the fetch to the pokemon object.
  async function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          addListItem(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // This function loads the individual pokemon data and assigns the data to the pokemon objects to be displayed in the modal.
  async function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = [];
        for (var i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
        }
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // This function provides validation for newly added items to the pokemonList array.
  function add(newItem) {
    if (typeof newItem === "object" && typeof newItem !== null) {
      if (typeof Object.keys(newItem) === typeof Object.keys(pokemonKeys)) {
        pokemonList.push(newItem);
      }
    } else {
      console.log("Data type must be an object");
    }
  }

  // This function logs the data for each pokemon.
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  // Returns the pokemon list
  function getAll() {
    return pokemonList;
  }

  // Function that hides the pokemon modal
  function hideModal() {
    modalContainer.classList.remove("is-visible");
  }

  //alternative ways to run hideModal
  window.addEventListener("keydown", (e) => {
    let closeButton = document.querySelector(".modal-close");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });
  modalContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  //pokemonRepository function return values
  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    showDetails: showDetails,
  };
})();

// Scrolling function for CSS
window.addEventListener("scroll", function () {
  let navBar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navBar.classList.add("scrolled");
  } else {
    navBar.classList.remove("scrolled");
  }
});

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
