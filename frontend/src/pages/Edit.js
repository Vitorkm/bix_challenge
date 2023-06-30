import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import EmployeeTable from "../components/EmployeeTable";
import MenuItem from "@mui/material/MenuItem";
import useAxios from "../services/api";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import ManageTable from "../components/ManageTable";
import EditForm from "../components/EditForm";

export default function Edit() {
  const api = useAxios();
  const [employee, setEmployee] = useState([]);
  const { id, type } = useParams();
  const [job, setJob] = useState("employed");
  const [name, setName] = useState("");


  

  const handleChange = (event) => {
    setJob(event.target.value);
  };


  
  useEffect(() => {
    if (type === "company") {
      Promise.all([
        api.get(`/companies/${id}/`),
        api.get(`/employee_companies/?company_id=${id}`),
      ]).then((response) => {
        setEmployee(response[1].data);
        setName(response[0].data.name);
      });
    } else {
      Promise.all([
        api.get(`/employees/${id}/`),
        api.get(`/employee_companies/?employee_id=${id}`),
      ]).then((response) => {
        setEmployee(response[1].data);
        setName(response[0].data.name);
      });
    }
  }, []);
  

  


  return (
    <div>
      <Grid container>
        <EditForm setName={setName} name={name} employee={employee} />
        
        {type === "company" ? (
          <Grid
            container
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#1e1e1e",
              borderColor: "#1e1e1e",
              border: "10px solid #1e1e1e",
              borderRadius: "10px",
            }}
          >
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "#fff",
                  backgroundColor: "#060d27",
                  width: "fit-content",
                  p: 1.5,
                  borderRadius: "10px",
                  margin: 5,
                }}
                component="div"
              >
                Employees List of {name}
              </Typography>
            </Grid>
            {employee.length === 0 ? (
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  sx={{ color: "#fff", margin: 5, textAlign: "center" }}
                  component="div"
                >
                  No employees found
                </Typography>
              </Grid>
            ) : (
              <Grid container xs={12} sx={{ marginBottom: 3 }}>
                <Grid item xs={3} sx={{ marginBottom: 3 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={job}
                      label="Type"
                      onChange={handleChange}
                    >
                      <MenuItem value={"employed"}>Employed</MenuItem>
                      <MenuItem value={"unemployed"}>Unemployed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  {employee.filter((item) =>
                    job === "unemployed"
                      ? item.date_left !== null
                      : item.date_left === null
                  ).length === 0 ? (
                    <Typography
                      variant="h6"
                      sx={{ color: "#fff", margin: 5, textAlign: "center" }}
                      component="div"
                    >
                      No employees found
                    </Typography>
                  ) : (
                    <EmployeeTable edit={true} job={job} employees={employee} />
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>
        ) : (
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "10px",
              backgroundColor: "#1e1e1e",
              borderColor: "#1e1e1e",
              border: "10px solid #1e1e1e",
              borderRadius: "10px",
            }}
          >
            <ManageTable id={id} />
          </Grid>
        )}
      </Grid>
      
    </div>
  );
}
