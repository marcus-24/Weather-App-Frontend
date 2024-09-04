import React, { useState, useEffect } from "react";
import { IWeather, JSONObject, StateProps } from "./interfaces";

// https://hackr.io/blog/react-projects
// https://medium.com/@oadaramola/a-pitfall-i-almost-fell-into-d1d3461b2fb8
// https://stackoverflow.com/questions/52770661/get-latitude-and-longitude-from-zip-code-javascript
// https://medium.com/@c_yatteau/how-to-find-address-coordinates-using-node-js-93ac860361f0
const API_KEY: string | undefined = process.env.REACT_APP_GEOCODE_API_KEY;
const THRESHOLD: number = 0.7;

function get_unique_dates(weather: IWeather[]): Array<string> {
  const start_dates: Array<string> = Array.from(
    weather,
    (item) => item.startTime.split("T")[0]
  ); //extract start times from IWeather objects
  const unique_start_dates: Array<string> = Array.from(new Set(start_dates)); // extract unique dates
  return unique_start_dates;
}

function WeatherElement(props: StateProps): any {
  //todo: get type for return

  const unique_start_dates: Array<string> = get_unique_dates(props.weather);

  let content: any = [];

  unique_start_dates.forEach((date) => {
    let weather_vals: IWeather[] = props.weather.filter((item) =>
      item.startTime.includes(date)
    ); // get all IWeather objects with the same start dates (day and night values)
    console.log(`Weather vals = ${weather_vals}`);
    content.push(<DayElement vals={weather_vals} />);
  });

  if (props.errorMsg) {
    return <>{props.errorMsg}</>;
  } else {
    return (
      <>
        {props.city && <h2>{props.city} Weather</h2>}
        {content}
      </>
    );
  }
}

function DayElement({ vals }: { vals: IWeather[] }) {
  return (
    <div className="weather-box">
      {vals.map((val) => (
        <div className="imgContainer" key={val.name}>
          <img
            className="imgstyle"
            src={val.icon}
            alt={`Forecast for ${val.name}`}
          />
          <figcaption className="captionstyle">
            <p>{val.name}</p>
            <p>
              {val.temperature}°{val.temperatureUnit}
            </p>
            <p>{val.shortForecast}</p>
          </figcaption>
        </div>
      ))}
    </div>
  );
}

async function fetch_content(url: string): Promise<JSONObject> {
  const response = await fetch(url);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`Could not get data. Got ${response.status} status code`);
  }
}

function get_coordinates(geocode: JSONObject): Array<string> {
  const latitude: string = geocode[0]["lat"];
  const longtitude: string = geocode[0]["lon"];

  return [latitude, longtitude];
}

export default function WeatherComp() {
  const [weather, setWeather] = useState<IWeather[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [city, setCity] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    let ignore: boolean = false; // avoid “race conditions”: network responses may arrive in a different order than you sent them.

    const fetchData = async () => {
      setIsLoading(true);
      setErrorMsg(""); // reset error message state

      try {
        const geocode_json = await fetch_content(
          `https://geocode.maps.co/search?q=${city}&api_key=${API_KEY}`
        );
        const importance_score: number = geocode_json[0]["importance"];

        if (importance_score < THRESHOLD) {
          setErrorMsg(`${city} not found. Please try your search again.`);
          throw new Error("testing");
        }

        const [latitude, longtitude] = get_coordinates(geocode_json);

        const endpoint_json = await fetch_content(
          `https://api.weather.gov/points/${latitude},${longtitude}`
        );
        const forecast_url: string = endpoint_json["properties"]["forecast"];

        const forecast_json = await fetch_content(forecast_url);

        if (!ignore) {
          const current_weather: IWeather[] =
            forecast_json["properties"]["periods"];

          console.log(current_weather);
          setWeather(current_weather);
        }
      } catch (err: any) {
        // setErrorMsg(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (city) {
      fetchData();
    }

    /*Return cleanup function */
    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const city_val: string = (document.getElementById(
      "form-submit-text"
    ) as HTMLInputElement)!.value; // "!" shows you know that city element exists in DOM & need to cast as HTMLElement
    setCity(city_val);
    console.log(city);
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <h1>7-Day Forecast</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="form-submit-text"
          name="form-submit-text"
          placeholder="Enter city name"
        />

        <input type="submit" value="Search" />
      </form>

      {city && weather && (
        <WeatherElement errorMsg={errorMsg} city={city} weather={weather} />
      )}
    </>
  );
}
