import React, { useState } from "react";
import "./Matches.scss";

function Matches({ teams, onMatchResult }) {
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  // const [winner, setWinner] = useState("");
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

    if (scoreA === 16 && scoreB !== 16) {
      winner = teamA;
      msg += `${teamA} Win!`;
    } else if (scoreB === 16 && scoreA !== 16) {
      winner = teamB;
      msg += `${teamB} Win!`;
    } else if (scoreA > scoreB) {
      winner = teamA;
      msg += `${teamA} Win!`;
    } else if (scoreB > scoreA) {
      winner = teamB;
      msg += `${teamB} Win!`;
    } else {
      winner = Math.random() < 0.5 ? teamA : teamB;
      msg += `${winner} Wins! (Sudden Death)`;
    }

    setMessage(msg);
    onMatchResult({ teamA, teamB, winner });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!teamA || !teamB || !winner || teamA === teamB) return;

  //   onMatchResult({ teamA, teamB, winner });
  //   setTeamA("");
  //   setTeamB("");
  //   // setWinner("");
  // };

  return (
    <div>
      <h1>Matches</h1>
      {/* <form onSubmit={handleSubmit}> */}
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

      {/* <select value={winner} onChange={(e) => setWinner(e.target.value)}>
          <option value="">Select Winner</option>
          {[teamA, teamB].filter(Boolean).map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select> */}

      <button onClick={simulateMatch}>Simulate Match</button>
      {/* </form> */}
      {/* <Matches teams={initialTeams} onMatchResult={handleMatchResult} /> */}
      {message && (
        <div style={{ marginTop: "10px", whiteSpace: "pre-line" }}>
          <strong>{message}</strong>
        </div>
      )}
    </div>
  );
}

export default Matches;
