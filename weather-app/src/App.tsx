import "./App.css";
import WeatherComp from "./Weather";

// https://medium.com/@kamindugayantha/getting-started-with-typescript-in-react-a-comprehensive-guide-650e73a4d84a

function App() {
  return (
    <>
      <header className="App-header">
        <h1>My First Website</h1>
      </header>
      <section className="App-section">
        <WeatherComp />
      </section>
    </>
  );
}

export default App;
