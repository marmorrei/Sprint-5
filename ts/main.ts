// INTERFACES

interface joke {
  id: string;
  joke: string;
  status: number;
}

// fetchJoke()

function fetchJoke(): void {
  const urlJokes: string = "https://icanhazdadjoke.com/";

  fetch(urlJokes, {
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((res: joke) => {
      console.log(res);
    });
}
