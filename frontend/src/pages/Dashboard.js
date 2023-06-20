import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "../components/Card";
import { useState, useEffect } from "react";
import api from "../services/api";

export default function Dashboard() {

  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/companies/").then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div
      style={{
        marginTop: "1rem",
        backgroundColor: "#121212",
      }}
    >
      <Grid
        container
        spacing={6}
        alignItems={"center"}
      >
        {data.map((item) => (
        <Grid item xs={4} key={item.id} >
          <Card name={item.name} img={item.picture} activity={item.activity} launchDate={item.lauch_date} location={item.location} />
        </Grid>))
          }
      </Grid>
    </div>
  );
}