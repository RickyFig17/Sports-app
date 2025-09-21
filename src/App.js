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
        let wins = team.wins;
        let loses = team.loses;
        let suddendeathloses = team.suddendeathloses;
        let points = team.points;

        if (team.name === winner) {
          wins = team.wins + 1;
          points = team.points + 3;
        } else {
          loses = team.loses + 1;
          if (isSuddenDeath) {
            suddendeathloses = team.suddendeathloses + 1;
            points = team.points + 1;
          }
        }

        return {
          ...team,
          wins,
          loses,
          suddendeathloses,
          points,
          pointsfor: team.pointsfor + scoreA,
          pointsagainst: team.pointsagainst + scoreB,
        };
      }

      if (team.name === teamB) {
        let wins = team.wins;
        let loses = team.loses;
        let suddendeathloses = team.suddendeathloses;
        let points = team.points;

        if (team.name === winner) {
          wins = team.wins + 1;
          points = team.points + 3;
        } else {
          loses = team.loses + 1;
          if (isSuddenDeath) {
            suddendeathloses = team.suddendeathloses + 1;
            points = team.points + 1;
          }
        }

        return {
          ...team,
          wins,
          loses,
          suddendeathloses,
          points,
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
