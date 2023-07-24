// INTERFACES
interface joke {
  id: string;
  joke: string;
  status: number;
}

interface weather {
  location: {
    name: string;
  };
  current: {
    condition: {
      text: string;
      icon: string;
    };
  };
}

//Array to store joke's reports & score value
const reportJokes: object[] = [];
let scoreValue: number | undefined;

// fetchJoke()
document.getElementById("nextButton")?.addEventListener("click", fetchJoke);

function fetchJoke(): void {
  const urlJokes: string = "https://icanhazdadjoke.com/";

  fetch(urlJokes, {
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((res: joke) => {
      const $jokesText: HTMLElement = <HTMLElement>(
        document.getElementById("jokes-text")
      );
      $jokesText.innerHTML = res.joke;
    });
}

// Score buttons to appear
document
  .getElementById("nextButton")
  ?.addEventListener("click", displayScoreButtons);
function displayScoreButtons(): void {
  const $scoreButtons: HTMLElement = <HTMLElement>(
    document.getElementById("score-options")
  );

  $scoreButtons.innerHTML = `
    <button onclick="collectScore(1)" class="score-btn"><img src="/public/css/images/emoji1.png" alt="emoji 1"></button>
    <button onclick="collectScore(2)" class="score-btn"><img src="/public/css/images/emoji2.png" alt="emoji 2"></button>
    <button onclick="collectScore(3)" class="score-btn"><img src="/public/css/images/emoji3.png" alt="emoji 3"></button>
  `;
}

// Select score option
function collectScore(score: number): void {
  scoreValue = score;
}

// Save on the reportJokes[] array the corresponding object
document.getElementById("nextButton")?.addEventListener("click", saveReport);
function saveReport(): void {
  const $jokesText: HTMLElement = <HTMLElement>(
    document.getElementById("jokes-text")
  );
  const currentDate: string = new Date().toISOString();
  let jokeReported: object;

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

//Weather API
async function fetchWeather(): Promise<void> {
  const urlWeather: string =
    "https://weatherapi-com.p.rapidapi.com/current.json?q=Barcelona";
  const options: object = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "0d030e417cmsh969e291855f2103p1f52e0jsn26371d57982e",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response: Response = await fetch(urlWeather, options);
    const result: weather = await response.json();

    const $weatherText: HTMLElement = <HTMLElement>(
      document.getElementById("weather")
    );
    $weatherText.innerHTML = `${result.location.name} - ${result.current.condition.text}`;
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
fetchWeather();
