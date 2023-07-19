"use strict";
// INTERFACES
// fetchJoke()
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
