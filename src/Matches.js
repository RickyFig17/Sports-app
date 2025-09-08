import React, { useState } from "react";
import "./Matches.scss";

function Matches({ teams, onMatchResult }) {
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [winner, setWinner] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!teamA || !teamB || !winner || teamA === teamB) return;

    onMatchResult({ teamA, teamB, winner });
    setTeamA("");
    setTeamB("");
    setWinner("");
  };

  return (
    <div>
      <h1>Matches</h1>
      <form onSubmit={handleSubmit}>
        <select value={teamA} onChange={(e) => setTeamA(e.target.value)}>
          <option value="">Select Team A</option>
          {teams?.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select value={teamB} onChange={(e) => setTeamB(e.target.value)}>
          <option value="">Select Team B</option>
          {teams?.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select value={winner} onChange={(e) => setWinner(e.target.value)}>
          <option value="">Select Winner</option>
          {[teamA, teamB].filter(Boolean).map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <button type="submit">Record Match</button>
      </form>
    </div>
  );
}

export default Matches;
