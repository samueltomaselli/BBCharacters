const characterName = document.querySelector(".title");
const characterImage = document.querySelector(".image");
const characterPortrayed = document.querySelector(".portrayed-answ");
const characterOccupation = document.querySelector(".ocupation-answ");
const characterStatus = document.querySelector(".status-answ");

const form = document.querySelector(".form");
const input = document.querySelector(".input");
const buttonNext = document.querySelector(".next");
const buttonPrevious = document.querySelector(".previous");

let searchCharacter = 1;

const idOrNumber = async (character) => {
  if (isNaN(character) === true) {
    return await fetch(`https://www.breakingbadapi.com/api/characters?name=${character}`);
  } else {
    return await fetch(`https://www.breakingbadapi.com/api/characters/${character}`);
  }
};

const fetchCharacter = async (character) => {
  const APIResponse = await idOrNumber(character);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderCharacter = async (character) => {
  characterName.innerHTML = "Loading...";
  const data = await fetchCharacter(character);

  if (data) {
    characterName.innerHTML = data[0].name;
    characterImage.src = data[0].img;
    characterPortrayed.innerHTML = data[0].portrayed;
    characterOccupation.innerHTML = data[0].occupation[0];
    characterStatus.innerHTML = data[0].status;
    input.value = "";
    searchCharacter = data[0].char_id;
  } else {
    characterName.innerHTML = "not found :c";
    input.value = "";
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  renderCharacter(input.value.toLowerCase());
});

buttonPrevious.addEventListener("click", () => {
  if (searchCharacter > 1) {
    searchCharacter -= 1;
    renderCharacter(searchCharacter);
  }
});

buttonNext.addEventListener("click", () => {
  if (searchCharacter >= 57) {
    searchCharacter = 1;
    renderCharacter(searchCharacter);
  } else {
    searchCharacter += 1;
    renderCharacter(searchCharacter);
  }
});
