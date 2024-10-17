import { useQuery } from "react-query";
import axios from "axios";
import { ReactElement } from "react";
import { IWeather, ResultProps } from "../interfaces";

async function retrieveWeather(url: string): Promise<IWeather[]> {
  const res = await axios.get(url);
  return res.data;
}

function WeatherBox(props: { name: string }) {
  return (
    <div className="weather-item">
      <p>{props.name}</p>
    </div>
  );
}

export function ShowResults({ city, baseUrl }: ResultProps): ReactElement {
  const url = `${baseUrl}/cities/${city}/weather-data`;
  const {
    data: weatherList,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["city", city],
    queryFn: () => retrieveWeather(url),
    enabled: !!city,
  });

  if (isLoading) return <h1>Finding matching cities....</h1>;
  else if (isError)
    return <h1>{`Could not find weather for ${city}. Please try again.`}</h1>;
  else {
    return (
      <div className="container" id="column">
        {weatherList!.map((weather: IWeather) => (
          <WeatherBox name={weather.name}></WeatherBox>
        ))}
      </div>
    );
  }
}
