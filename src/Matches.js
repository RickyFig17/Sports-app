import React, { useState } from "react";
import "./Matches.scss";

function Matches({ teams, onMatchResult }) {
  const WEEKS = 12;

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
    let winner;
    let msg = `${teamA} ${scoreA} - ${scoreB} ${teamB}`;
    let isSuddenDeath = false;

    if (scoreA === scoreB) {
      isSuddenDeath = true;
      winner = Math.random() < 0.5 ? teamA : teamB;
      msg += ` → ${winner} Wins! (Sudden death)`;
    } else {
      winner = scoreA > scoreB ? teamA : teamB;
      msg += ` → ${winner} Wins!`;
    }

    setMessage(msg);
    onMatchResult({ teamA, teamB, scoreA, scoreB, winner, isSuddenDeath });
  };

  const generateSchedule = () => {
    const schedule = [];
    for (let w = 0; w < WEEKS; w++) {
      const shuffled = [...teams].sort(() => Math.random() - 0.5);
      const matches = [];
      for (let i = 0; i < shuffled.length; i += 2) {
        matches.push({
          teamA: shuffled[i],
          teamB: shuffled[i + 1],
          result: null,
          message: null,
        });
      }
      schedule.push(matches);
    }
    return schedule;
  };

  const [schedule, setSchedule] = useState(generateSchedule);

  const simulateScheduledMatch = (weekIndex, matchIndex) => {
    setSchedule((prev) => {
      const newSchedule = [...prev];
      const match = newSchedule[weekIndex][matchIndex];

      let scoreA = Math.floor(Math.random() * 17);
      let scoreB = Math.floor(Math.random() * 17);
      let winner;
      let isSuddenDeath = false;
      let msg = `${match.teamA} ${scoreA} - ${scoreB} ${match.teamB}`;

      if (scoreA === scoreB) {
        isSuddenDeath = true;
        winner = Math.random() < 0.5 ? match.teamA : match.teamB;
        msg += ` → ${winner} Wins! (Sudden Death)`;
      } else {
        winner = scoreA > scoreB ? match.teamA : match.teamB;
        msg += ` → ${winner} Wins!`;
      }

      onMatchResult({
        teamA: match.teamA,
        teamB: match.teamB,
        scoreA,
        scoreB,
        winner,
        isSuddenDeath,
      });

      newSchedule[weekIndex][matchIndex] = {
        ...match,
        result: { scoreA, scoreB, winner, isSuddenDeath },
        message: msg,
      };

      return newSchedule;
    });
  };

  const simulateAllMatches = (weekIndex) => {
    setSchedule((prev) => {
      const newSchedule = [...prev];
      newSchedule[weekIndex] = newSchedule[weekIndex].map((match) => {
        let scoreA = Math.floor(Math.random() * 17);
        let scoreB = Math.floor(Math.random() * 17);
        let winner;
        let isSuddenDeath = false;
        let msg = `${match.teamA} ${scoreA} - ${scoreB} ${match.teamB}`;

        if (scoreA === scoreB) {
          isSuddenDeath = true;
          winner = Math.random() < 0.5 ? match.teamA : match.teamB;
          msg += ` → ${winner} Wins! (Sudden Death)`;
        } else {
          winner = scoreA > scoreB ? match.teamA : match.teamB;
          msg += ` → ${winner} Wins!`;
        }

        onMatchResult({
          teamA: match.teamA,
          teamB: match.teamB,
          scoreA,
          scoreB,
          winner,
          isSuddenDeath,
        });

        return {
          ...match,
          result: { scoreA, scoreB, winner, isSuddenDeath },
          message: msg,
        };
      });

      return newSchedule;
    });
  };

  return (
    <div>
      <h1>Matches</h1>

      <h2>Manual Match</h2>
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

      <h2>Scheduled Matches (12 Weeks)</h2>
      {schedule.map((week, wIdx) => (
        <div key={wIdx}>
          <h3>Week {wIdx + 1}</h3>
          <button onClick={() => simulateAllMatches(wIdx)}>
            Simulate All Matches
          </button>
          {week.map((match, mIdx) => (
            <div key={mIdx}>
              {match.teamA} vs {match.teamB}{" "}
              <button onClick={() => simulateScheduledMatch(wIdx, mIdx)}>
                Result
              </button>
              {match.message && <span> → {match.message}</span>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Matches;
