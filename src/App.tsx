import { useState } from "react";
// import { useQuery } from "react-query";
import { SearchProps, ILocation, IOption } from "./interfaces";
import AsyncSelect from "react-select/async";
// import { SingleValue } from "react-select";
// import makeAnimated from "react-select/animated";
import axios from "axios";
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

function AsyncSearchBar({ setCity }: SearchProps): any {
  // https://dev.to/wlytle/implementing-a-searchable-async-dropdown-in-react-5hce
  const [query, setQuery] = useState<string>("");

  // fetch filteres search results for dropdown
  const loadOptions = async (): Promise<IOption[]> => {
    return axios
      .get(`http://localhost:4000/weather-locs/${query}`)
      .then((resp) => {
        return resp.data.map((loc: ILocation) => ({
          value: loc.display_name,
          label: loc.display_name,
        }));
      });
  };

  //get animated components wrapper
  // const animatedComponents = makeAnimated();

  const handleChange = (value: IOption | null) => {
    const city = value!.label;
    setCity(city);
  };

  return (
    <>
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        onInputChange={(value) => setQuery(value)}
        onChange={handleChange}
      />
    </>
  );
}

function App() {
  // const [weatherList, setWeatherList] = useState<IWeather[]>([]); // place holder until I use react-query
  const [city, setCity] = useState<string>("");

  return (
    <>
      <Header />
      <AsyncSearchBar setCity={setCity} />
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
