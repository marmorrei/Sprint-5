"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c;
//Array to store joke's reports & score value
const reportJokes = [];
let scoreValue;
// Random jokes call
(_a = document
    .getElementById("nextButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", fetchRandomJokes);
function fetchRandomJokes() {
    let randomNumber = Math.floor(Math.random() * 2);
    if (randomNumber === 1) {
        fetchJoke();
    }
    else {
        fetchChuckNorris();
    }
}
// Dad Jokes API
function fetchJoke() {
    const urlJokes = "https://icanhazdadjoke.com/";
    fetch(urlJokes, {
        headers: {
            Accept: "application/json",
        },
    })
        .then((res) => res.json())
        .then((res) => {
        const $jokesText = (document.getElementById("jokes-text"));
        $jokesText.innerHTML = res.joke;
    });
}
// Chuck Norris API
function fetchChuckNorris() {
    const urlChuckNorris = "https://api.chucknorris.io/jokes/random";
    fetch(urlChuckNorris)
        .then((resChuck) => resChuck.json())
        .then((resChuck) => {
        const $jokesText = (document.getElementById("jokes-text"));
        $jokesText.innerHTML = resChuck.value;
    });
}
// Weather API
function fetchWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        const urlWeather = "https://weatherapi-com.p.rapidapi.com/current.json?q=Barcelona";
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "0d030e417cmsh969e291855f2103p1f52e0jsn26371d57982e",
                "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
            },
        };
        try {
            const response = yield fetch(urlWeather, options);
            const result = yield response.json();
            const $weatherText = (document.getElementById("weather"));
            $weatherText.innerHTML = `${result.location.name} - ${result.current.condition.text}`;
            console.log(result);
        }
        catch (error) {
            console.error(error);
        }
    });
}
fetchWeather();
// Score buttons to appear
(_b = document
    .getElementById("nextButton")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", displayScoreButtons);
function displayScoreButtons() {
    const $scoreButtons = (document.getElementById("score-options"));
    $scoreButtons.innerHTML = `
    <button onclick="collectScore(1)" class="score-btn"><img src="/public/css/images/emoji1.png" alt="emoji 1"></button>
    <button onclick="collectScore(2)" class="score-btn"><img src="/public/css/images/emoji2.png" alt="emoji 2"></button>
    <button onclick="collectScore(3)" class="score-btn"><img src="/public/css/images/emoji3.png" alt="emoji 3"></button>
  `;
}
// Select score option
function collectScore(score) {
    scoreValue = score;
}
// Save on the reportJokes[] array the corresponding object
(_c = document.getElementById("nextButton")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", saveReport);
function saveReport() {
    const $jokesText = (document.getElementById("jokes-text"));
    const currentDate = new Date().toISOString();
    let jokeReported;
    if (typeof scoreValue === "number") {
        jokeReported = {
            joke: $jokesText.textContent,
            score: scoreValue,
            date: currentDate,
        };
        reportJokes.push(jokeReported);
        console.log(reportJokes);
    }
    scoreValue = undefined;
}
