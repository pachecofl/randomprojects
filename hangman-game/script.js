"use strict";

// select variables
const wordContainer = document.querySelector("#word-container");
const wrongLettersList = document.querySelector(".letter-list");
const hangman = document.querySelectorAll(".hangman");
const overlay = document.querySelector(".overlay");
const btn = document.querySelector(".modal button");
const modal = document.querySelector(".modal");
const modalText = document.querySelector(".modal p");
const modalTitle = document.querySelector(".modal h1");
const notification = document.querySelector(".notification-container");
const notificationText = document.querySelector(".notification-container p");

// initial values
const words = [
  "Alligator",
  "Alpaca",
  "Ant",
  "Armadillo",
  "Donkey",
  "Bat",
  "Bear",
  "Beaver",
  "Buffalo",
  "Butterfly",
  "Camel",
  "Cat",
  "Caterpillar",
  "Cattle",
  "Chicken",
  "Chimpanzee",
  "Chinchilla",
  "Cobra",
  "Cockroach",
  "Coyote",
  "Crab",
  "Crocodile",
  "Crow",
  "Deer",
  "Dinosaur",
  "Dog",
  "Dolphin",
  "Dove",
  "Dragonfly",
  "Duck",
  "Eagle",
  "Elephant",
  "Falcon",
  "Fish",
  "Flamingo",
  "Fly",
  "Fox",
  "Frog",
  "Gazelle",
  "Giraffe",
  "Goat",
  "Goldfish",
  "Goose",
  "Gorilla",
  "Grasshopper",
  "Hamster",
  "Hawk",
  "Hedgehog",
  "Hippopotamus",
  "Horse",
  "Hyena",
  "Jaguar",
  "Jellyfish",
  "Kangaroo",
  "Koala",
  "Leopard",
  "Lion",
  "Llama",
  "Lobster",
  "Monkey",
  "Moose",
  "Mosquito",
  "Mouse",
  "Octopus",
  "Otter",
  "Owl",
  "Panther",
  "Parrot",
  "Penguin",
  "Pig",
  "Pigeon",
  "Pony",
  "Rabbit",
  "Raccoon",
  "Rat",
  "Rhinoceros",
  "Scorpion",
  "Seahorse",
  "Seal",
  "Shark",
  "Sheep",
  "Snake",
  "Spider",
  "Squirrel",
  "Tiger",
  "Turkey",
  "Turtle",
  "Whale",
  "Wildcat",
  "Wolf",
  "Wombat",
  "Zebra",
];
const word = [];
const pressedLetters = [];
const letterIndexes = [];
let errors = 0;
let isPlaying = true;

// FUNCTIONS --------------------------------------
function newWord() {
  //close modal
  overlay.classList.add("hidden");
  modal.classList.add("hidden");

  //isplaying
  isPlaying = true;
  // clean last word
  //word
  wordContainer.innerHTML = "";
  word.length = 0;
  //wrong letters
  wrongLettersList.innerHTML = "";
  errors = 0;
  //pressed letters
  pressedLetters.length = 0;

  // select new word
  const newWord = words[Math.trunc(Math.random() * words.length)].toLowerCase();
  word.push(...newWord);

  //add letters to UI
  for (let i = 0; i < word.length; i++) {
    //create elements
    const letterContainer = document.createElement("div");
    const letter = document.createElement("span");

    //add classes
    letterContainer.classList.add("letter-box");
    letter.classList.add("letter");

    //add to UI
    letterContainer.appendChild(letter);
    wordContainer.appendChild(letterContainer);
  }

  // hide hangman
  for (let i = 0; i < hangman.length; i++) {
    hangman[i].classList.add("hide");
  }
}

function addWrongLetter(letter) {
  const wrongLetter = document.createElement("li");
  wrongLetter.textContent = letter;
  wrongLettersList.appendChild(wrongLetter);
}

function isGameOver() {
  const amountLetter = document.querySelectorAll(".done");
  if (errors === 6) {
    isPlaying = false;
    toggleModal("gameover");
  } else if (amountLetter.length === word.length) {
    console.log(amountLetter.length);
    isPlaying = false;
    toggleModal("won");
  }
}

function toggleModal(type) {
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
  modalText.textContent = `${
    type === "gameover"
      ? `Sorry, you lost the game :( the word was: ${word.join("")}.`
      : `Yeeeahh, you won the game!! :) the word ${word.join("")} was correct.`
  }`;
  modalTitle.textContent = `${type === "gameover" ? "Oh no!" : "Yes!"}`;
}

function hideNotification() {
  notification.classList.remove("show");
}

// INIT ------------------------------------------
newWord();

// EVENTS ----------------------------------------

document.addEventListener("keydown", function (e) {
  const pressedLetter = e.key;
  //check if is playing
  if (isPlaying) {
    //check if IS a letter
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      //IS a letter
      if (
        !pressedLetters.includes(pressedLetter) &&
        word.includes(pressedLetter)
      ) {
        // NOT pressed && corret
        //add pressed letter
        pressedLetters.push(pressedLetter);

        //add letters to UI
        //right letter indexes
        for (let i = 0; i < word.length; i++) {
          if (word[i] === pressedLetter) {
            letterIndexes.push(i);
          }
        }
        //add letter to UI
        const letters = document.querySelectorAll(".letter");
        while (letterIndexes.length > 0) {
          letters[letterIndexes[0]].classList.add("done");
          letters[letterIndexes[0]].textContent = pressedLetter;
          letterIndexes.shift();
        }

        isGameOver();
      } else if (
        !pressedLetters.includes(pressedLetter) &&
        !word.includes(pressedLetter)
      ) {
        // NOT pressed && wrong
        //add pressed letter
        pressedLetters.push(pressedLetter);

        //add letter to UI
        addWrongLetter(pressedLetter);

        //add hangman
        hangman[errors].classList.remove("hide");
        errors++;

        isGameOver();
      } else if (pressedLetters.includes(pressedLetter)) {
        // pressed
        notificationText.textContent = `You already tried the letter ${pressedLetter}`;
        notification.classList.add("show");
        setTimeout(hideNotification, 3000);
      }
    } else {
      //NOT a letter
      notificationText.textContent = `${pressedLetter} is not a letter`;
      notification.classList.add("show");
      setTimeout(hideNotification, 3000);
    }
  }
});

btn.addEventListener("click", newWord);
