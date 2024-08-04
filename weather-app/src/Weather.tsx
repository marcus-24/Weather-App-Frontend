import React, { useState, useEffect } from "react";

// https://hackr.io/blog/react-projects
// https://medium.com/@oadaramola/a-pitfall-i-almost-fell-into-d1d3461b2fb8
// https://stackoverflow.com/questions/52770661/get-latitude-and-longitude-from-zip-code-javascript
// https://medium.com/@c_yatteau/how-to-find-address-coordinates-using-node-js-93ac860361f0
const API_KEY: any = process.env.REACT_APP_GEOCODE_API_KEY; //TODO: Find typehint for this

interface IWeather {
  [weather: string]: string;
}

// function WeatherItem({ data }) {}

export default function WeatherComp() {
  const [weather, setWeather] = useState<IWeather>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [city, setCity] = useState<string>("Boston");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    let ignore: boolean = false; // avoid “race conditions”: network responses may arrive in a different order than you sent them.

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const geocode_resp = await fetch(
          `https://geocode.maps.co/search?q=${city}&api_key=${API_KEY}`
        );
        const geocode_json = await geocode_resp.json();
        const latitude: string = geocode_json[0]["lat"];
        const longtitude: string = geocode_json[0]["lon"];

        const endpoint_resp = await fetch(
          `https://api.weather.gov/points/${latitude},${longtitude}`
        );
        const json = await endpoint_resp.json();
        const forecast_url: string = json["properties"]["forecast"];

        const forecast_resp = await fetch(forecast_url);
        const forecast_json = await forecast_resp.json();
        if (!ignore) {
          // console.log(forecast_json["properties"]["periods"]);
          setWeather(forecast_json["properties"]["periods"]);
          console.log(weather);
        }
      } catch (err: any) {
        setErrorMsg(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    /*Return cleanup function */
    return () => {
      ignore = true;
    };
  }, [city]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const city_val: string = (document.getElementById(
      "city"
    ) as HTMLInputElement)!.value; // "!" shows you know that city element exists in DOM & need to cast as HTMLElement
    setCity(city_val);
    console.log(city);
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  if (errorMsg) {
    return <>{errorMsg}</>;
  }

  return (
    <>
      <h1>7-Day Forecast</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="city">City: </label>
        <input type="text" id="city" name="city" />

        <input type="submit" value="Submit" />
      </form>
    </>
  );
}
