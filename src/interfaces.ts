import { Dispatch, SetStateAction } from "react";

export interface IWeather {
  detailedForecast: string;
  endTime: string;
  icon: string;
  isDayTime: boolean;
  name: string;
  number: number;
  // probabilitityOfPrecipitation: [prop: string]: number;
  shortForecast: string;
  startTime: string;
  temperature: number;
  temperatureTrend: string;
  temperatureUnit: string;
  windDirection: string;
  windSpeed: string;
}

export interface ILocation {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
  importance: number;
}

export interface IOption {
  label: string;
  value: string;
}

type JSONValue = string | number | boolean | JSONObject | any;

export interface JSONObject {
  [key: string]: JSONValue;
}

export interface StateProps {
  city: string;
  weather: IWeather[];
}

export interface SearchProps {
  setCity: Dispatch<SetStateAction<string>>;
}

export interface ResultProps {
  city: string;
  baseUrl: string;
}

export interface WeatherItemProps {
  formattedDate: string;
  weatherDay: IWeather[];
}
