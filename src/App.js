import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Standings from "./Standings";
import Tournament from "./Tournament";
import Matches from "./Matches";
import React, { useState } from "react";
import Playoffs from "./Playoffs";

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
  "Flyers",
  "Sharks",
  "Canucks",
  "Jets",
  "Avalanche",
  "Wild",
  "Lightning",
  ];

  const [standings, setStandings] = useState(
    initialTeams.map((t) => ({
      name: t,
      points: 0,
      wins: 0,
      loses: 0,
      pointsfor: 0,
      pointsagainst: 0,
      suddendeathloses: 0,
      plusminus: 0,
    }))
  );

  const handleMatchResult = ({
    teamA,
    teamB,
    scoreA,
    scoreB,
    winner,
    isSuddenDeath,
  }) => {
    setStandings((prev) =>
      prev.map((team) => {
        if (team.name === teamA) {
          return {
            ...team,
            wins: team.name === winner ? team.wins + 1 : team.wins,
            loses: team.name !== winner ? team.loses + 1 : team.loses,
            suddendeathloses:
              team.name !== winner && isSuddenDeath
                ? team.suddendeathloses + 1
                : team.suddendeathloses,
            points:
              team.name === winner
                ? team.points + 3
                : isSuddenDeath
                ? team.points + 1
                : team.points,
            pointsfor: team.pointsfor + scoreA,
            pointsagainst: team.pointsagainst + scoreB,
          };
        }
        if (team.name === teamB) {
          return {
            ...team,
            wins: team.name === winner ? team.wins + 1 : team.wins,
            loses: team.name !== winner ? team.loses + 1 : team.loses,
            suddendeathloses:
              team.name !== winner && isSuddenDeath
                ? team.suddendeathloses + 1
                : team.suddendeathloses,
            points:
              team.name === winner
                ? team.points + 3
                : isSuddenDeath
                ? team.points + 1
                : team.points,
            pointsfor: team.pointsfor + scoreB,
            pointsagainst: team.pointsagainst + scoreA,
          };
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
            <Route
              path="/matches"
              element={
                <Matches
                  teams={initialTeams}
                  onMatchResult={handleMatchResult}
                />
              }
            />
            <Route
              path="/standings"
              element={<Standings standings={standings} />}
            />
            <Route path="/Tournament" element={<Tournament />} />
            <Route path="/playoffs" element={<Playoffs />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
