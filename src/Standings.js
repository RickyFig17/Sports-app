import * as React from "react";
import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Matches from "./Matches";
import { styled } from "@mui/material/styles";

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
      headerName: "Losses",
      type: "number",
      width: 90,
    },
    {
      field: "suddendeathloses",
      headerName: "SDL",
      type: "number",
      width: 90,
    },
    {
      field: "pointsfor",
      headerName: "Points For",
      type: "number",
      width: 90,
    },

    {
      field: "pointsagainst",
      headerName: "Points Against",
      type: "number",
      width: 90,
    },
    {
      field: "plusminus",
      headerName: "+/-",
      type: "number",
      width: 90,
    },
  ];

  const rows = standings?.map((team, index) => ({
    id: index + 1,
    team: team.name,
    points: team.points,
    wins: team.wins,
    loses: team.loses,
    suddendeathloses: team.suddendeathloses,
    pointsfor: team.pointsfor,
    pointsagainst: team.pointsagainst,
    plusminus: team.plusminus,
  }));

  const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    "& .MuiDataGrid-row.red-divider": {
      borderBottom: "3px solid red",
    },
  }));

  return (
    <div>
      <h1>Standings</h1>

      <Paper>
        <StyledDataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 20]}
          disableRowSelectionOnClick
          initialState={{
            sorting: {
              sortModel: [{ field: "points", sort: "desc" }],
            },
          }}
          getRowClassName={(params) => {
            const totalGames = standings.reduce(
              (sum, t) => sum + t.wins + t.loses,
              0
            );
            if (totalGames >= 8 && params.indexRelativeToCurrentPage === 7) {
              return "red-divider";
            }
            return "";
          }}
        />
      </Paper>
    </div>
  );
}

export default Standings;
