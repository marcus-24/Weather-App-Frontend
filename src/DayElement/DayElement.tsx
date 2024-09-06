import { IWeather } from "../interfaces";

export function DayElement({ vals }: { vals: IWeather[] }) {
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
