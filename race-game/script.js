"use strict";

//get elements -----------------------
const tableBody = document.querySelector("tbody");
const select = document.querySelector("#select-horse");
const input = document.querySelector("#amount-input");
const btnBet = document.querySelector("#place-bet");
const walletDisplay = document.querySelector(".wallet-amount");
const raceResultDisplay = document.querySelector(".race-result");
const raceContainer = document.querySelector(".race-container");
const weatherDisplay = document.querySelector(".daily-weather");

// initial values --------------------
const competitors = [
	{
		name: "Thunderbolt",
		speed: 67,
		betterWhen: "sunny",
		age: 3,
		lastRace: 7,
		points: 0,
		img: "img/thunderbolt.png",
	},
	{
		name: "Midnight Shadow",
		speed: 65,
		betterWhen: "rainy",
		age: 5,
		lastRace: 3,
		points: 0,
		img: "img/midnight-shadow.png",
	},
	{
		name: "Spirit",
		speed: 68,
		betterWhen: "cloudy",
		age: 2,
		lastRace: 2,
		points: 0,
		img: "img/spirit.png",
	},
	{
		name: "Bella Luna",
		speed: 64,
		betterWhen: "sunny",
		age: 3,
		lastRace: 4,
		points: 0,
		img: "img/bella-luna.png",
	},
	{
		name: "Starfire",
		speed: 70,
		betterWhen: "snowy",
		age: 5,
		lastRace: 8,
		points: 0,
		img: "img/starfire.png",
	},
	{
		name: "Dakota",
		speed: 69,
		betterWhen: "sunny",
		age: 3,
		lastRace: 1,
		points: 0,
		img: "img/dakota.png",
	},
	{
		name: "Maverick",
		speed: 70,
		betterWhen: "windy",
		age: 3,
		lastRace: 5,
		points: 0,
		img: "img/maverick.png",
	},
	{
		name: "Serenity",
		speed: 65,
		betterWhen: "sunny",
		age: 2,
		lastRace: 10,
		points: 0,
		img: "img/serenity.png",
	},
	{
		name: "Apollo",
		speed: 68,
		betterWhen: "rainy",
		age: 2,
		lastRace: 9,
		points: 0,
		img: "img/apollo.png",
	},
	{
		name: "Willowbrook",
		speed: 67,
		betterWhen: "windy",
		age: 2,
		lastRace: 6,
		points: 0,
		img: "img/willowbrook.png",
	},
];
let wallet = 500;
let weather = "sunny";
const weatherOp = ["sunny", "windy", "cloudy", "rainy", "snowy"];

// functions -------------------------
function setWeather() {
	//clear last day
	const lastWeather = document.querySelector(".selected-weather");
	lastWeather.classList.remove("selected-weather");

	//add new day
	const dayWeather = Math.trunc(Math.random() * 5);
	weather = weatherOp[dayWeather];
	const newWeather = document.querySelector(`.${weather}`);
	newWeather.classList.add("selected-weather");
}

function addCompetitors() {
	setWeather();
	//clean
	tableBody.innerHTML = "";
	select.innerHTML = "";
	//add to UI table
	for (let i = 0; i < competitors.length; i++) {
		// row
		const row = document.createElement("tr");
		//info
		const picture = document.createElement("td");
		const img = document.createElement("img");
		const compName = document.createElement("td");
		const speed = document.createElement("td");
		const weather = document.createElement("td");
		const age = document.createElement("td");
		const lastRace = document.createElement("td");
		//add info
		img.setAttribute("src", competitors[i].img);
		img.classList.add("horse-img");
		picture.append(img);
		compName.textContent = competitors[i].name;
		speed.textContent = `${competitors[i].speed}km/h`;
		weather.textContent = competitors[i].betterWhen;
		age.textContent = `${competitors[i].age}yr`;
		lastRace.textContent = `${competitors[i].lastRace}°`;
		//append
		row.append(picture, compName, speed, weather, age, lastRace);
		tableBody.appendChild(row);
	}

	//add to UI select
	for (let i = 0; i < competitors.length; i++) {
		const option = document.createElement("option");
		option.textContent = competitors[i].name;
		option.value = i;
		select.appendChild(option);
	}
}

function race() {
	//race points
	for (let i = 0; i < competitors.length; i++) {
		const luckNumber = Math.trunc(Math.random() * 10) + 1;
		competitors[i].points = Math.trunc(
			competitors[i].speed +
				parseInt(`${competitors[i].betterWhen === weather ? 3 : 0}`) +
				parseInt(`${competitors[i].lastRace <= 5 ? 2 : 1}`) +
				parseInt(`${competitors[i].age <= 3 ? 2 : 1}`) +
				luckNumber
		);
	}
}

function raceResults() {
	//organize indexes acording to points
	const indexes = competitors.map((competitor, index) => index);
	indexes.sort((a, b) => competitors[b].points - competitors[a].points);

	// change lastRace numbers according to position of index
	let position = 1;
	for (let i = 0; i < competitors.length; i++) {
		competitors[indexes[i]].lastRace = position;
		position++;
	}
}

function betResult(selectedComp, amount) {
	raceContainer.classList.remove("racing");
	if (competitors[selectedComp].lastRace === 1) {
		raceResultDisplay.textContent = `Congratulations! ${
			competitors[selectedComp].name
		} finished in Fist 🥇. You got ${amount * 2}€.`;
		raceContainer.classList.add("win");
		wallet = wallet + amount * 2;
		walletDisplay.textContent = `${wallet}€`;
	} else if (competitors[selectedComp].lastRace === 2) {
		raceResultDisplay.textContent = `Nice! ${
			competitors[selectedComp].name
		} finished in Second 🥈. You got ${amount * 1.5}€.`;
		raceContainer.classList.add("win");
		wallet = wallet + amount * 1.5;
		walletDisplay.textContent = `${wallet}€`;
	} else if (competitors[selectedComp].lastRace === 3) {
		raceResultDisplay.textContent = `Cool! ${
			competitors[selectedComp].name
		} finished in Third 🥉. You got ${amount * 1.2}€.`;
		raceContainer.classList.add("win");
		wallet = wallet + amount * 1.2;
		walletDisplay.textContent = `${wallet}€`;
	} else {
		raceResultDisplay.textContent = `Sorry! ${competitors[selectedComp].name} finished in ${competitors[selectedComp].lastRace}°, you lost ${amount}€. Better luck next time 🍀`;
		raceContainer.classList.add("lost");
	}
}

function placeBet(event) {
	event.preventDefault();
	const selectedComp = select.selectedIndex;
	const amount = +input.value;
	const type = typeof amount;
	raceContainer.classList.remove("win", "lost");
	raceContainer.classList.add("racing");

	//check if user can play
	if (type === "number") {
		if (amount <= wallet && amount > 0) {
			wallet = wallet - amount;
			raceResultDisplay.textContent = `Your bet of ${amount}€ on ${competitors[selectedComp].name} was placed. The race just started...`;
			walletDisplay.textContent = `${wallet}€`;
			race();
			raceResults();
			setTimeout(() => betResult(selectedComp, amount), 3000);
			setTimeout(addCompetitors, 3000);
		} else {
			console.log("add a correct amount");
			raceResultDisplay.textContent = `Please enter an amount bellow or equal to €${wallet}.`;
		}
	} else {
		console.log("invalid bet");
		raceResultDisplay.textContent = `Please enter a valid amount to bet.`;
	}
}

// init
addCompetitors();
// setWeather();

//event
btnBet.addEventListener("click", placeBet);
