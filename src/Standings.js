import * as React from "react";
import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Matches from "./Matches";

function Standings({ standings }) {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "team", headerName: "Team", width: 100 },
    { field: "points", headerName: "Points", type: "number", width: 90 },
    {
      field: "wins",
      headerName: "Wins",
      type: "number",
      width: 90,
    },
    {
      field: "loses",
      headerName: "Loses",
      type: "number",
      width: 90,
    },
    {
      field: "tengamestreak",
      headerName: "Last 10 Games",
      type: "number",
      width: 130,
    },
  ];

  const rows = standings?.map((team, index) => ({
    id: index + 1,
    team: team.name,
    points: team.points,
    wins: team.wins,
    loses: team.loses,
    tengamestreak: team.tengamestreak,
  }));

  return (
    <div>
      <h1>Standings</h1>

      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          // initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
}

export default Standings;
