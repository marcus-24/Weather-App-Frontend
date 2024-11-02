import { useState, ReactElement } from "react";
import { AsyncSearchBar } from "./components/AsyncSearchBar";
import { ShowResults } from "./components/ShowResults";

import "./App.css";

const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL; //need to have "VITE" prefix env variables and use this import method instead

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
      <AsyncSearchBar setCity={setCity} backendUrl={BACKEND_URL} />
      <ShowResults city={city} backendUrl={BACKEND_URL} />
    </>
  );
}

export default App;
