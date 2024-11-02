import { useQuery } from "react-query";
import axios from "axios";
import { ReactElement } from "react";
import { IWeather, ResultProps, WeatherItemProps } from "../interfaces";

const DEFAULTDATEOPTIONS = { month: "long", day: "numeric", year: "numeric" };

async function retrieveWeather(url: string): Promise<IWeather[]> {
  const res = await axios.get(url);
  return res.data;
}

function formatDate(val: IWeather, options: any = DEFAULTDATEOPTIONS): string {
  const dateObj = new Date(val.startTime);
  return dateObj.toLocaleDateString("en-US", options);
}

function WeatherContainer({ weatherList }: { weatherList: IWeather[] }) {
  const groupedWeather = Object.groupBy(weatherList, formatDate);

  return (
    <div className="container" id="column">
      {Object.entries(groupedWeather).map((val) => (
        <WeatherItem formattedDate={val[0]} weatherDay={val[1]!} />
      ))}
    </div>
  );
}

export function WeatherItem({
  formattedDate,
  weatherDay,
}: WeatherItemProps): ReactElement {
  return (
    <>
      <h1>{formattedDate}</h1>
      <div className="weather-item">
        {weatherDay.map((val: IWeather) => (
          <WeatherFigure val={val} />
        ))}
      </div>
    </>
  );
}

export function WeatherFigure({ val }: { val: IWeather }): ReactElement {
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

export function ShowResults({ city, backendUrl }: ResultProps): ReactElement {
  const url = `${backendUrl}/cities/${city}/weather-data`;
  const { status, data: weatherList } = useQuery({
    queryKey: ["city", city],
    queryFn: () => retrieveWeather(url),
    enabled: !!city,
  });

  switch (status) {
    case "loading":
      return <h1>Finding matching cities....</h1>;
    case "error":
      return <h1>{`Could not find weather for ${city}. Please try again.`}</h1>;
    case "success":
      return <WeatherContainer weatherList={weatherList} />;
    default:
      return <></>;
  }
}
