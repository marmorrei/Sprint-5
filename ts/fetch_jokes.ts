import { joke } from "./interface/interface";

export default function fetchJoke(): void {
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
