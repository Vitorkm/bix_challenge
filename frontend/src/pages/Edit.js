import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Grid from "@mui/material/Grid";
import CompanyCard from "../components/CompanyCard";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import EmployeeTable from "../components/EmployeeTable";
import MenuItem from "@mui/material/MenuItem";
import GroupRemoveOutlinedIcon from "@mui/icons-material/GroupRemoveOutlined";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import FlightTakeoffOutlinedIcon from "@mui/icons-material/FlightTakeoffOutlined";
import Checkbox from "@mui/material/Checkbox";
import JobInfo from "../components/JobInfo";
import useAxios from "../services/api";

export default function Register() {
  const api = useAxios();
  const [employee, setEmployee] = useState([]);
  const [checked, setChecked] = useState(false);
  const [date, setDate] = useState(new Date());
  const [leftdate, setLeftDate] = useState(new Date());
  const [picture, setPicture] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [activity, setActivity] = useState("");
  const [company, setCompany] = useState([]);
  const [companyname, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [vacation, setVacation] = useState(false);
  const [jobid, setJobId] = useState(0);
  const { id, type } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (type === "company") {
      Promise.all([
        api.get(`/companies/${id}/`),
        api.get(`/employee_companies/?company_id=${id}`),
      ]).then((response) => {
        setEmployee(response[1].data);
        setName(response[0].data.name);
        setLocation(response[0].data.location);
        setActivity(response[0].data.activity);
        setPicture(response[0].data.picture);
        setDate(new Date(response[0].data.lauch_date));
      });
    } else {
      Promise.all([
        api.get(`/employees/${id}/`),
        api.get(`/employee_companies/?employee_id=${id}`),
        api.get(`/companies/`),
      ]).then((response) => {
        setEmployee(response[1].data);
        setName(response[0].data.name);
        setCompany(response[2].data);
        setCompanyName(
          response[1].data[response[1].data.length - 1].company_name
        );
        setPosition(response[1].data[response[1].data.length - 1].position);
        setVacation(response[1].data[response[1].data.length - 1].on_vacation);
        setDate(
          new Date(response[1].data[response[1].data.length - 1].date_joined)
        );
        setLeftDate(
          new Date(response[1].data[response[1].data.length - 1].date_left)
        );
        setJobId(response[1].data[response[1].data.length - 1].id);
      });
    }
  }, []);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const lastItem = employee.length > 0 ? employee[employee.length - 1] : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "company") {
      api
        .put(`/companies/${id}/`, {
          name: name,
          activity: activity,
          lauch_date: date.toISOString().substring(0, 10),
          location: location,
          picture: picture,
        })
        .then((response) => {
          console.log(response.data);
          alert("Company updated successfully!");
          navigate("/dashboard");
        });
    } else {
      Promise.all([
        api.put(`/employees/${id}/`, {
          name: name,
        }),
        api.put(`/employee_companies/${jobid}/`, {
          employee_name: name,
          company_name: companyname,
          position: position,
          date_joined: date.toISOString().substring(0, 10),
          date_left: checked ? leftdate.toISOString().substring(0, 10) : null,
          on_vacation: vacation,
        }),
      ]).then((response) => {
        console.log(response[0].data);
        console.log(response[1].data);
        alert("Employee updated successfully!");
        navigate("/dashboard");
      });
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (type === "company") {
      api.delete(`/companies/${id}/`).then((response) => {
        console.log(response.data);
        alert(`${name} deleted successfully!`);
        navigate("/dashboard");
      });
    } else {
      api.delete(`/employees/${id}/`).then((response) => {
        console.log(response.data);
        alert(`${name} deleted successfully!`);
        navigate("/dashboard");
      });
    }
  };

  return (
    <div>
      <Grid container>
        <div
          style={{
            width: "100%",
            marginBottom: 10,
            backgroundColor: "#1e1e1e",
            borderColor: "#1e1e1e",
            border: "10px solid #1e1e1e",
            borderRadius: "10px",
          }}
          onClick={() => console.log(date)}
        >
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <IconButton
              aria-label="back"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              variant="h5"
              sx={{
                color: "#fff",
                backgroundColor: "#060d27",
                width: "fit-content",
                p: 1.5,
                borderRadius: "10px",
                marginBottom: 5,
              }}
              component="div"
            >
              Edit the Information of {name}
            </Typography>
          </Grid>

          <FormControl fullWidth>
            <Grid
              container
              justifyContent={"center"}
              spacing={2}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={3} sm={4} md={4}>
                {type === "employee" ? (
                  <TextField
                    select
                    label={"Company"}
                    sx={{ width: "100%", select: { color: "#fff" } }}
                    inputProps={{
                      color: "#fff",
                    }}
                    value={companyname}
                    onChange={(e) => setCompanyName(e.target.value)}
                  >
                    {company.map((company) => (
                      <MenuItem value={company.name}>{company.name}</MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <TextField
                    label={"Activity"}
                    sx={{ width: "100%", select: { color: "#fff" } }}
                    inputProps={{
                      color: "#fff",
                    }}
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                  />
                )}
              </Grid>

              <Grid item xs={3} sm={4} md={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label={
                      type === "company" ? "Launch Date" : "Admission Date"
                    }
                    sx={{ width: "100%" }}
                    inputFormat="YYYY-MM-DD"
                    value={date}
                    onChange={(value) => setDate(value)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>

              {type === "employee" ? (
                <>
                  <Grid
                    item
                    xs={3}
                    sm={0.5}
                    md={0.5}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Checkbox
                      {...label}
                      sx={{
                        "&.Mui-checked": {
                          color: "red",
                        },
                      }}
                      icon={<GroupRemoveOutlinedIcon />}
                      checkedIcon={<GroupRemoveIcon />}
                      onChange={(e) => setChecked(e.target.checked)}
                      checked={checked}
                    />
                  </Grid>
                  <Grid item xs={3} sm={3.5} md={3.5}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        disabled={!checked}
                        label={"Resign Date"}
                        sx={{ width: "100%" }}
                        inputFormat="YYYY-MM-DD"
                        value={leftdate}
                        onChange={(value) => setLeftDate(value)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                </>
              ) : (
                <Grid item xs={3} sm={4} md={4}>
                  <TextField
                    label={"Location"}
                    sx={{ width: "100%" }}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </Grid>
              )}

              <Grid item xs={3} sm={4} md={4}>
                <TextField
                  label={type === "company" ? "Picture Link" : "Position"}
                  sx={{ width: "100%" }}
                  value={type === "company" ? picture : position}
                  onChange={(e) =>
                    type === "company"
                      ? setPicture(e.target.value)
                      : setPosition(e.target.value)
                  }
                />
              </Grid>

              <Grid item xs={3} sm={7} md={7}>
                <TextField
                  label="Name"
                  sx={{ width: "100%" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid
                item
                xs={3}
                sm={1}
                md={1}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <FlightTakeoffOutlinedIcon
                  sx={{ color: "#fff" }}
                  onClick={() => console.log(vacation)}
                />
                <Checkbox
                  {...label}
                  sx={{
                    "&.Mui-checked": {
                      color: "#0E6BA8",
                    },
                  }}
                  checked={vacation}
                  onChange={(e) => setVacation(e.target.checked)}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={6}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#A31621",
                    width: "100%",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#82111a",
                    },
                  }}
                  onClick={handleDelete}
                >
                  {type === "company" ? "Delete Company" : "Delete Employee"}
                </Button>
              </Grid>
              <Grid item xs={2} sm={4} md={6}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#0E6BA8",
                    width: "100%",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#107ac0",
                    },
                  }}
                  onClick={handleSubmit}
                >
                  Submit Update
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </div>
        <Grid
          container
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
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
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
              Preview {type === "company" ? "Card" : "Perfil"}
            </Typography>
          </Grid>
          <Grid
            item
            xs={11}
            sm={type === "company" ? 8 : 11}
            md={type === "company" ? 6 : 11}
            lg={type === "company" ? 5 : 11}
            xl={type === "company" ? 5 : 11}
            sx={{ marginBottom: 3 }}
          >
            {type === "company" ? (
              <CompanyCard
                img={picture}
                activity={activity}
                launchDate={date}
                location={location}
                edit={true}
              />
            ) : (
              lastItem && (
                <JobInfo
                  data={employee}
                  position={position}
                  company={companyname}
                  name={name}
                  vacation={vacation}
                />
              )
            )}
          </Grid>
        </Grid>
        {type === "company" && (
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
              <Grid item xs={12} sx={{ marginBottom: 3 }}>
                <EmployeeTable edit={true} employees={employee} />
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    </div>
  );
}
