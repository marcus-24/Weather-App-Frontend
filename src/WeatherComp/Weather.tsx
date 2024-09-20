import React, {
  useState,
  Dispatch,
  SetStateAction,
  FormEvent,
  ReactElement,
} from "react";
import { IWeather, FormProps } from "../interfaces";
import { WeatherResults } from "../WeatherResults";
import { useQuery } from "react-query";
import axios from "axios";

// https://hackr.io/blog/react-projects
// https://medium.com/@oadaramola/a-pitfall-i-almost-fell-into-d1d3461b2fb8
// https://stackoverflow.com/questions/52770661/get-latitude-and-longitude-from-zip-code-javascript
// https://medium.com/@c_yatteau/how-to-find-address-coordinates-using-node-js-93ac860361f0
const API_KEY: string | undefined = process.env.REACT_APP_GEOCODE_API_KEY;
const THRESHOLD: number = 0.7;

const retrieveLocationData = async (url: string) => {
  const geocode_response = await axios.get(url);
  const geocode_json = geocode_response.data[0]; //Get top match in the list of search results

  const [latitude, longitude] = [geocode_json["lat"], geocode_json["lon"]];

  const result_city = geocode_json["display_name"].split(",")[0];

  const weather_url: string = `https://api.weather.gov/points/${latitude},${longitude}`; // todo: make input to function
  const importance_score: number = geocode_json["importance"];

  if (importance_score < THRESHOLD)
    throw new Error(
      "City not found. The results are below the matching threshold."
    );

  return { url: weather_url, city: result_city };
};

const retrieveWeather = async (url: string) => {
  const endpoint_json = await axios.get(url);
  const forecast_url: string = endpoint_json.data["properties"]["forecast"];
  const forecast_json = await axios.get(forecast_url);
  const current_weather: IWeather[] =
    forecast_json.data["properties"]["periods"];

  return current_weather;
};

export function CitySubmitForm({ setSearchCity }: FormProps): any {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const city_val: string = (document.getElementById(
      "form-submit-text"
    ) as HTMLInputElement)!.value; // "!" shows you know that city element exists in DOM & need to cast as HTMLElement
    setSearchCity(city_val); //@todo: Use result from search to display weather
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
  const [search_city, setSearchCity] = useState<string>("");

  const intialData = { url: "", city: "" };
  const {
    data: loc_data,
    isError: isLocError,
    isLoading: isLoadingLoc,
  } = useQuery({
    queryKey: ["search_city", search_city],
    queryFn: () =>
      retrieveLocationData(
        `https://geocode.maps.co/search?q=${search_city}&api_key=${API_KEY}`
      ),
    initialData: () => intialData,
    enabled: !!search_city,
  });

  const {
    data: weather,
    isError: isWeatherError,
    isLoading: isLoadingWeather,
  } = useQuery(
    ["weather_url", loc_data!.url],
    () => retrieveWeather(loc_data!.url),
    { enabled: !!loc_data!.url }
  );

  if (isLoadingLoc) return <>Finding matching cities....</>;
  if (isLoadingWeather) return <>Getting weather....</>;

  let result: ReactElement = <></>;
  if (isLocError) {
    result = <>Can't find a matching city</>;
  } else if (isWeatherError) {
    result = <>Can't retrieve weather data</>;
  } else if (weather) {
    result = <WeatherResults city={loc_data!.city} weather={weather} />;
  }

  return (
    <>
      <h1>7-Day Forecast</h1>
      <CitySubmitForm setSearchCity={setSearchCity} />
      {result}
    </>
  );
}
