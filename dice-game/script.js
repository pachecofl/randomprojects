"use strict";

//variables -------------------------------
const amountOfDice = document.querySelector(".dice-amount");
const btnRollDice = document.querySelector(".roll-dice");
const diceList = document.querySelector(".dice");
const dice = document.querySelector(".dice .die");

// test
const body = document.querySelector("body");
//body.style.backgroundImage = `"url('img/die-1.png')"`;

//function --------------------------------
function rollDie() {
  return Math.trunc(Math.random() * 6) + 1;
}
function addDie() {
  const die = document.createElement("div");
  die.classList.add("die");
  const number = rollDie();
  die.style.backgroundImage = `url('img/die-${number}.png')`;
  diceList.appendChild(die);
}
function removeDice() {
  const dice = document.querySelectorAll(".die");
  for (let die of dice) {
    die.remove();
  }
}

//events ----------------------------------
btnRollDice.addEventListener("click", function (e) {
  e.preventDefault();
  //no number
  if (!amountOfDice.value) {
    console.warn("No number");
  } else {
    removeDice();
    let amount = 1;
    while (amount <= amountOfDice.value) {
      addDie();
      amount++;
    }
  }
});

/*
var nodes = document.getElementById('ID_of_parent').childNodes;
<script>
const para = document.createElement("p");
const node = document.createTextNode("This is new.");
para.appendChild(node);

const element = document.getElementById("div1");
element.appendChild(para);
</script>
*/
