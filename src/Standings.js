import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "team", headerName: "Team", width: 100 },
  { field: "points", headerName: "Points", type: Number, width: 90 },
  {
    field: "wins",
    headerName: "Wins",
    type: Number,
    width: 90,
  },
  {
    field: "loses",
    headerName: "Loses",
    type: Number,
    width: 90,
  },
  {
    field: "tengamestreak",
    headerName: "Last 10 Games",
    type: Number,
    width: 130,
    // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, team: "Bruins", points: 0, wins: 0, loses: 0, tengamestreak: 0 },
  { id: 2, team: "Rangers", points: 0, wins: 0, loses: 0, tengamestreak: 0 },
  { id: 3, team: "Islanders", points: 0, wins: 0, loses: 0, tengamestreak: 0 },
  { id: 4, team: "Flames", points: 0, wins: 0, loses: 0, tengamestreak: 0 },
  { id: 5, team: "Stars", points: 0, wins: 0, loses: 0, tengamestreak: 0 },
  { id: 6, team: "Oilers", points: 0, wins: 0, loses: 0, tengamestreak: 0 },
  { id: 7, team: "Kings", points: 0, wins: 0, loses: 0, tengamestreak: 0 },
  { id: 8, team: "Predators", points: 0, wins: 0, loses: 0, tengamestreak: 0 },
  { id: 9, team: "Panthers", points: 0, wins: 0, loses: 0, tengamestreak: 0 },
];

const paginationModel = { page: 0, pageSize: 5 };

function Standings() {
  return (
    <div>
      <h1>Standings</h1>

      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
}

export default Standings;
