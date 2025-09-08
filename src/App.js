import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Standings from "./Standings";
import Tournament from "./Tournament";
import Matches from "./Matches";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/standings" element={<Standings />} />
            <Route path="/Tournament" element={<Tournament />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
