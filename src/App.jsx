import "./App.css";
import CurrencyConverter from "./components/CurrencyConverter";
import NewsFeed from "./components/NewsFeed";

function App() {
  return (
    <div className="app__container">
      <h1>Crypto Dashboard</h1>
      <div className="rows">
        <CurrencyConverter />
        <NewsFeed />
      </div>
    </div>
  );
}

export default App;
