import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Standings from "./Standings";
import Tournament from "./Tournament";
import Matches from "./Matches";
import React, { useState } from "react";

function App() {
  const initialTeams = [
    "Bruins",
    "Rangers",
    "Islanders",
    "Flames",
    "Stars",
    "Oilers",
    "Kings",
    "Predators",
    "Panthers",
  ];

  const [standings, setStandings] = useState(
    initialTeams.map((t) => ({
      name: t,
      points: 0,
      wins: 0,
      loses: 0,
      pointsfor: 0,
      pointsagainst: 0,
      plusminus: 0
    }))
  );

  const handleMatchResult = ({ teamA, teamB, winner }) => {
    setStandings((prev) =>
      prev.map((team) => {
        if (team.name === winner) {
          return { ...team, wins: team.wins + 1 };
        }
        if (
          (team.name === teamA || team.name === teamB) &&
          team.name !== winner
        ) {
          return { ...team, loses: team.loses + 1 };
        }
        return team;
      })
    );
  };

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
      <Matches teams={initialTeams} onMatchResult={handleMatchResult} />
      <Standings standings={standings} />
    </div>
  );
}

export default App;
