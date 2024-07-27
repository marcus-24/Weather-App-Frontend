import React, { useState, useEffect } from "react";

// https://hackr.io/blog/react-projects
// https://medium.com/@oadaramola/a-pitfall-i-almost-fell-into-d1d3461b2fb8
// const APIKEY: string = process.env.ACCU_WEATHER_APIKEY;

interface IWeather {
  [weather: string]: string;
}

export default function WeatherComp() {
  const [weather, setWeather] = useState<IWeather>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number>(39.7456);
  const [longtitude, setLongitude] = useState<number>(-97.0892);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let ignore: boolean = false; // avoid “race conditions”: network responses may arrive in a different order than you sent them.

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const forecast_endpoints = await fetch(
          `https://api.weather.gov/points/${latitude},${longtitude}`
        );
        const json = await forecast_endpoints.json();
        const forecast_url: string = json["properties"]["forecast"];

        const forecast_data = await fetch(forecast_url);
        const forecast_json = await forecast_data.json();
        console.log(forecast_json);
      } catch (e) {
        setErrorMsg(e);
      } finally {
        setIsLoading(false);
      }

      // const forecast_endpoints = await fetch(
      //   `https://api.weather.gov/points/${latitude},${longtitude}`,
      //   { signal }
      // );
      // if (!forecast_endpoints.ok) {
      //   throw new Error(`Response status: ${forecast_endpoints.status}`);
      // }

      // const json = await forecast_endpoints.json();
      // const forecast_url: string = json["properties"]["forecast"];
      // console.log(forecast_url);

      // const forecast_data = await fetch(forecast_url);
    };

    fetchData();

    /*Return cleanup function */
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div>
      <h1>My First Weather App!</h1>
    </div>
  );
}
