import { useState, FormEvent } from "react";
// import { useQuery } from "react-query";
// import { IWeather } from "./interfaces";
import "./App.css";

const weatherList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function Header() {
  return (
    <header>
      <h1>Weather Forecast React Application</h1>
      <h2>
        The purpose of this site is to learn how to use React JS, Express JS and
        Node JS to retrieve weather data and display it to the site visitors.
      </h2>
    </header>
  );
}

function App() {
  // const [weatherList, setWeatherList] = useState<IWeather[]>([]); // place holder until I use react-query
  const [city, setCity] = useState("");
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };
  const handleChange = (event: FormEvent) => {
    const casted_target = event.target as HTMLInputElement;
    setCity(casted_target.value);
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          id="form-submit-text"
          name="form-submit-text"
          placeholder="Enter city name"
          onChange={handleChange}
        />
        <input id="submit-button" type="submit" value="Search" />
      </form>
      <h1>{city}</h1>
      <div className="container" id="column">
        {weatherList.map((weather) => (
          <div className="weather-item">
            <p>{weather}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
