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
        This site displays the forecast of the selected city entered in the
        search bar below. It is powered by the ReactJS Framework to generate the
        webpage and NodeJS with ExpressJS to search for the weather forecast
        results.
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
