import {
  fireEvent,
  render,
  screen,
  waitFor,
  cleanup,
} from "@testing-library/react";
import axios from "axios";
import { describe, expect, test, vi } from "vitest";

import { AsyncSearchBar } from "../../components/AsyncSearchBar";

//https://www.codezimple.com/how-to-mock-axios-with-vitest/

describe("Test AsyncSearchBar Component", () => {
  afterEach(async () => {
    vi.restoreAllMocks(); // Restore all mocks to original functions after each test
    cleanup(); // cleanup render
  });

  test("Check Boston Results", async () => {
    const mockSetCity = vi.fn(); //mock setcity function
    const mockData = [{ display_name: "Boston, MA" }];
    vi.spyOn(axios, "get").mockResolvedValue({ data: mockData }); //mock axios.get

    render(<AsyncSearchBar setCity={mockSetCity} backendUrl={""} />);
    const searchBarElement = screen.getByRole("combobox"); //role assigned to react-select component

    //Simulate typing input
    fireEvent.change(searchBarElement, {
      target: { value: "Boston" },
    });

    await waitFor(() => {
      // Wait for options to load
      screen.findByText("Boston, MA");

      // Select an option
      fireEvent.click(screen.getByText("Boston, MA"));

      // Verify that the option is selected
      expect(screen.getByText("Boston, MA")).toBeInTheDocument();
    });
  });

  test.todo("Test if match doesnt exist");
});
