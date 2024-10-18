import { useQuery } from "react-query";
import axios from "axios";
import { ReactElement } from "react";
import { IWeather, ResultProps } from "../interfaces";

const DEFAULTDATEOPTIONS = { month: "long", day: "numeric", year: "numeric" };

async function retrieveWeather(url: string): Promise<IWeather[]> {
  const res = await axios.get(url);
  return res.data;
}

function displayFriendlyDate(
  date: string,
  options: any = DEFAULTDATEOPTIONS
): string {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US", options);
}

function WeatherFigure({ val }: { val: IWeather }) {
  return (
    <figure className="img-container">
      <img src={val.icon} alt={`Forecast for ${val.name}`} />
      <figcaption>
        <p>{val.name}</p>
        <p>
          {val.temperature}°{val.temperatureUnit}
        </p>
        <p>{val.shortForecast}</p>
      </figcaption>
    </figure>
  );
}

function WeatherItem({ weatherDay }: { weatherDay: IWeather[] }): ReactElement {
  const date: string = weatherDay[0].startTime.split("T")[0];
  return (
    <>
      <h1>{displayFriendlyDate(date)}</h1>
      <div className="weather-item">
        {weatherDay.map((val: IWeather) => (
          <WeatherFigure val={val} />
        ))}
      </div>
    </>
  );
}

function get_unique_dates(weather: IWeather[]): string[] {
  const start_dates: string[] = Array.from(
    weather,
    (item) => item.startTime.split("T")[0]
  ); //extract start times from IWeather objects
  return Array.from(new Set(start_dates)); // extract unique dates
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
  else if (city) {
    const unique_start_dates: string[] = get_unique_dates(weatherList!);
    return (
      <div className="container" id="column">
        {unique_start_dates.map((date: string) => {
          const weatherDay: IWeather[] = weatherList!.filter(
            (item: IWeather) => {
              return item.startTime.includes(date);
            }
          );
          return <WeatherItem weatherDay={weatherDay} />;
        })}
      </div>
    );
  } else {
    return <></>;
  }
}
