import { describe, expect, test, beforeEach, afterEach } from "vitest";
import { WeatherFigure } from "../../components/ShowResults";
import { IWeather } from "../../interfaces";
import { render, screen, cleanup } from "@testing-library/react";

function createEmptyWeatherData(): IWeather {
  return {
    detailedForecast: "",
    endTime: "",
    icon: "myfakeurl",
    isDayTime: true,
    name: "Tuesday",
    number: 0,
    shortForecast: "Rainy and Warm",
    startTime: "2014-1-1",
    temperature: 0,
    temperatureTrend: "",
    temperatureUnit: "F",
    windDirection: "NW",
    windSpeed: "100mph",
  };
}

describe("Test Weather Figure Component", () => {
  beforeEach(() => {
    const weather: IWeather = createEmptyWeatherData();
    render(<WeatherFigure val={weather} />);
  });

  afterEach(() => {
    cleanup();
  });

  test("Sanity check for first ReactJS test", () => {
    const imgElement = screen.getByRole("img");
    expect(imgElement).toBeInTheDocument();
  });

  test("Check image tag", () => {
    const imgElement = screen.getByRole("img");
    expect(imgElement).toHaveAttribute("src", "myfakeurl");
    expect(imgElement).toHaveAttribute("alt", "Forecast for Tuesday");
  });

  test("Check image caption", () => {
    const figElement = screen.getByRole("figure");
    expect(figElement).toHaveTextContent("Tuesday");
    expect(figElement).toHaveTextContent("0°F");
    expect(figElement).toHaveTextContent("Rainy and Warm");
  });
});
