import { IWeather } from "../interfaces";
import { DayElement } from "../DayElement";
import { StateProps } from "../interfaces";

export function get_unique_dates(weather: IWeather[]): Array<string> {
  const start_dates: Array<string> = Array.from(
    weather,
    (item) => item.startTime.split("T")[0]
  ); //extract start times from IWeather objects
  const unique_start_dates: Array<string> = Array.from(new Set(start_dates)); // extract unique dates
  return unique_start_dates;
}

export function WeatherElement(props: StateProps): any {
  //todo: get type for return

  const unique_start_dates: Array<string> = get_unique_dates(props.weather);

  let content: any = [];

  unique_start_dates.forEach((date) => {
    let weather_vals: IWeather[] = props.weather.filter((item) =>
      item.startTime.includes(date)
    ); // get all IWeather objects with the same start dates (day and night values)
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