import { useState, ReactElement } from "react";
import { AsyncSearchBar } from "./components/AsyncSearchBar";
import { ShowResults } from "./components/ShowResults";

import "./App.css";

const API_URL: string = "http://localhost:4000";

function Header(): ReactElement {
  return (
    <header>
      <h1>Weather Forecast React Application</h1>
      <h2>
        The purpose of this site is to learn how to use React JS, Express JS and
        Node JS to retrieve weather data and display it to the site visitors.
      </h2>
    </header>
  );
}

function App() {
  const [city, setCity] = useState<string>("");

  return (
    <>
      <Header />
      <AsyncSearchBar setCity={setCity} />
      <ShowResults city={city} baseUrl={API_URL} />
    </>
  );
}

export default App;
