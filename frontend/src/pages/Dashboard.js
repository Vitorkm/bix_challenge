import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CompanyCard from "../components/CompanyCard";
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
        spacing={5}
        alignItems={"center"}
      >
        {data.map((item) => (
        <Grid item xs={12} sm={6} md={6} lg={3} xl={3} key={item.id} >
          <CompanyCard id={item.id} name={item.name} img={item.picture} activity={item.activity} launchDate={item.lauch_date} location={item.location} />
        </Grid>))
          }
      </Grid>
    </div>
  );
}
