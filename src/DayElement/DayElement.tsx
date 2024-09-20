import { IWeather } from "../interfaces";

export function DayElement({ weather_array }: { weather_array: IWeather[] }) {
  // array has max length of 2 depending on day and night available
  return (
    <div className="weather-box" data-testid="test-weather-box">
      {weather_array.map((val) => (
        <figure className="imgContainer" key={val.name}>
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
        </figure>
      ))}
    </div>
  );
}
