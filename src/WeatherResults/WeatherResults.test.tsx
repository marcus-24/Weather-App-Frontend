import { get_unique_dates, WeatherResults } from "./WeatherResults";
import { IWeather } from "../interfaces";
import { render, screen, cleanup } from "@testing-library/react";

function weatherTemplate(startTime: string): IWeather {
  return {
    detailedForecast: "",
    endTime: "",
    icon: "",
    isDayTime: true,
    name: "",
    number: 0,
    shortForecast: "",
    startTime: startTime,
    temperature: 0,
    temperatureTrend: "",
    temperatureUnit: "",
    windDirection: "",
    windSpeed: "",
  };
}

function createWeatherList(times: string[]): IWeather[] {
  return times.map(weatherTemplate);
}

describe("Test extracting unique dates from weather results", () => {
  test("simple two consecutive day", () => {
    const times = ["2024-09-12T19:00:00", "2024-09-13T19:00:00"];
    const weather_list: IWeather[] = createWeatherList(times);

    expect(get_unique_dates(weather_list)).toEqual([
      "2024-09-12",
      "2024-09-13",
    ]);
  });

  test("repeated days", () => {
    const times = ["2024-09-12T19:00:00", "2024-09-12T19:00:00"];
    const weather_list: IWeather[] = createWeatherList(times);

    expect(get_unique_dates(weather_list)).toEqual(["2024-09-12"]);
  });

  test.todo("empty entry");
});

describe("Test WeatherResults on screen logic", () => {
  afterEach(() => {
    cleanup(); //cleanup rendered component after each tests so test inputs are independent from each other.
  });

  test.todo("Check render when all 7 day and nights of weather is available");
});
