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

type JSONValue = string | number | boolean | JSONObject | any;

export interface JSONObject {
  [key: string]: JSONValue;
}

export interface StateProps {
  errorMsg: string;
  city: string;
  weather: IWeather[];
}
