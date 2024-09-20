import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";

import { WeatherComp, CitySubmitForm } from "./Weather";

const queryClient = new QueryClient();

const MockWeatherComp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherComp />
    </QueryClientProvider>
  );
};

describe("Testing Weather Component Functions", () => {
  test("Submit form should update city state", () => {
    // const setState = jest.fn();
    // jest
    //   .spyOn(React, "useState")
    //   .mockImplementationOnce((initState) => [initState, setState]);
    //   render(<CitySubmitForm />);
  });
});

describe("Integration testing for WeatherComp", () => {
  // https://dev.to/zaklaughton/the-only-3-steps-you-need-to-mock-an-api-call-in-jest-39mb
  // beforeEach(() => {
  //   global.fetch = jest.mock();
  // });

  test("Check that there are 7 days of forecast available", async () => {
    // render(<MockWeatherComp />); //TODO: Add mock response from API.
    // const inputElement = screen.getByPlaceholderText(/Enter city name/i);
    // const buttonElement = screen.getByDisplayValue("Search");
    // fireEvent.change(inputElement, { target: { value: "Boston" } });
    // fireEvent.click(buttonElement);
    // const divElements = screen.getAllByTestId("test-weather-box");
    // expect(divElements.length).toBe(7);
  });
});
