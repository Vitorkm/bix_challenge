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
import Autocomplete from "@mui/material/Autocomplete";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import EmployeeTable from "../components/EmployeeTable";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return <>{value === index && <>{children}</>}</>;
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [value, setValue] = React.useState(0);
  const [filter, setFilter] = useState("");
  const [employee, setEmployee] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    Promise.all([api.get("/companies/"), api.get("/employees/")]).then(
      (response) => {
        setData(response[0].data);
        setEmployee(response[1].data);
      }
    );
  }, []);

  return (
    <div
      style={{
        marginTop: "1rem",
        backgroundColor: "#121212",
      }}
    >
      <Grid container spacing={5} alignItems={"center"}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{
              width: "100%",
              backgroundColor: "#1e1e1e",
              borderColor: "#1e1e1e",
              border: "1px solid #1e1e1e",
              borderRadius: "10px",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={{ margin: "0 0 1rem 1rem",
              '& .MuiTabs-indicator': {
                backgroundColor: '#005DA8',
                
              },
              '&.Mui-focusVisible': {
                backgroundColor: '#005DA8',
                
                
              },
              '& .Mui-selected': {
                color: '#005DA8',
              },
              }}
              
            >
              <Tab label="Companies" {...a11yProps(0)} />
              <Tab label="Employees" {...a11yProps(1)} />
            </Tabs>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={
                value == 0
                  ? data.map((option) => option.name)
                  : employee.map((option) => option.name)
              }
              sx={{ width: 300, margin: "0 0 1rem 1rem" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={value == 0 ? "Company" : "Employee"}
                />
              )}
              onChange={(event, value) => {
                setFilter(value);
              }}
            />
          </Stack>
        </Grid>
        <TabPanel value={value} index={0} >
          {data
            .filter((item) => (filter ? item.name.includes(filter) : data))
            .map((item) => (
              <Grid item xs={12} sm={6} md={6} lg={3} xl={3} key={item.id}>
                <CompanyCard
                  id={item.id}
                  name={item.name}
                  img={item.picture}
                  activity={item.activity}
                  launchDate={item.lauch_date}
                  location={item.location}
                />
              </Grid>
            ))}
            
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid item xs={12}>
            <EmployeeTable employee={filter} />
          </Grid>
        </TabPanel>
      </Grid>
    </div>
  );
}
