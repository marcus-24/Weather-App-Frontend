import React, { useState } from "react";
import { IWeather, JSONObject, FormProps } from "../interfaces";
import { WeatherResults } from "../WeatherResults";
import { useQuery } from "react-query";

// https://hackr.io/blog/react-projects
// https://medium.com/@oadaramola/a-pitfall-i-almost-fell-into-d1d3461b2fb8
// https://stackoverflow.com/questions/52770661/get-latitude-and-longitude-from-zip-code-javascript
// https://medium.com/@c_yatteau/how-to-find-address-coordinates-using-node-js-93ac860361f0
const API_KEY: string | undefined = process.env.REACT_APP_GEOCODE_API_KEY;
const THRESHOLD: number = 0.7;

export async function fetch_content(url: string): Promise<JSONObject> {
  const response = await fetch(url);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`Could not get data. Got ${response.status} status code`);
  }
}

export function get_coordinates(geocode: JSONObject): Array<string> {
  const latitude: string = geocode[0]["lat"];
  const longtitude: string = geocode[0]["lon"];

  return [latitude, longtitude];
}

const retrieveGeocodeUrl = async (
  url: string,
  setWeatherUrl: React.Dispatch<React.SetStateAction<string>>
) => {
  //todo: replace fetch with axios function.
  const geocode_json = await fetch_content(url);

  const [latitude, longitude] = get_coordinates(geocode_json);
  const weather_url: string = `https://api.weather.gov/points/${latitude},${longitude}`; // todo: make input to function
  const importance_score: number = geocode_json[0]["importance"];
  setWeatherUrl(importance_score > THRESHOLD ? weather_url : "");
};

const retrieveWeather = async (
  url: string,
  setWeather: React.Dispatch<React.SetStateAction<IWeather[]>>
) => {
  const endpoint_json = await fetch_content(url);
  const forecast_url: string = endpoint_json["properties"]["forecast"];
  const forecast_json = await fetch_content(forecast_url);
  const current_weather: IWeather[] = forecast_json["properties"]["periods"];
  setWeather(current_weather);
};

function CitySubmitForm({ setCity }: FormProps): any {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const city_val: string = (document.getElementById(
      "form-submit-text"
    ) as HTMLInputElement)!.value; // "!" shows you know that city element exists in DOM & need to cast as HTMLElement
    setCity(city_val);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="form-submit-text"
        name="form-submit-text"
        placeholder="Enter city name"
      />

      <input type="submit" value="Search" />
    </form>
  );
}

export function WeatherComp() {
  const [city, setCity] = useState<string>("");
  const [weather_url, setWeatherUrl] = useState<string>("");
  const [weather, setWeather] = useState<IWeather[]>([]);

  const { error: geocode_error, isLoading: isGeocodeLoading } = useQuery(
    ["city", city], //set key-value dependency. fetch executes when new value is defined
    () =>
      retrieveGeocodeUrl(
        `https://geocode.maps.co/search?q=${city}&api_key=${API_KEY}`,
        setWeatherUrl
      ), // set as arrow function to allow input to function
    { enabled: !!city } // only execute if city exists (aka not empty string in this case)
  );

  const { error: weather_error, isLoading: isWeatherLoading } = useQuery(
    ["weather_url", weather_url],
    () => retrieveWeather(weather_url, setWeather),
    { enabled: !!weather_url }
  );

  if (isGeocodeLoading) return <>Loading Location Data...</>;
  else if (isWeatherLoading) return <>Loading Weather...</>;

  return (
    <>
      <h1>7-Day Forecast</h1>
      <CitySubmitForm setCity={setCity} />
      <WeatherResults errorMsg={""} city={city} weather={weather} />
    </>
  );
}
