import React, { useState } from "react";
import "./Matches.scss";

function Matches({ teams, onMatchResult }) {
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [message, setMessage] = useState("");

  const simulateMatch = () => {
    if (!teamA || !teamB || teamA === teamB) {
      setMessage("Select two different teams.");
      return;
    }

    const scoreA = Math.floor(Math.random() * 17);
    const scoreB = Math.floor(Math.random() * 17);
    let winner = null;
    let msg = `${teamA} ${scoreA} - ${scoreB} ${teamB}`;
    let isSuddenDeath = false;

    if (scoreA === scoreB) {
      isSuddenDeath = true;
      winner = Math.random() < 0.5 ? teamA : teamB;
      msg += `${winner} Wins! (Sudden death) (${scoreA}-${scoreB})`;
    } else {
      winner = scoreA > scoreB ? teamA : teamB;
      msg += `${winner} Wins! Final Score: ${scoreA} - ${scoreB}`;
    }

    setMessage(msg);
    onMatchResult({ teamA, teamB, scoreA, scoreB, winner, isSuddenDeath });
  };

  return (
    <div>
      <h1>Matches</h1>
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

      <button onClick={simulateMatch}>Simulate Match</button>
      {message && (
        <div style={{ marginTop: "10px", whiteSpace: "pre-line" }}>
          <strong>{message}</strong>
        </div>
      )}
    </div>
  );
}

export default Matches;
