import { useEffect, useState, useRef } from "react";
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
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import AlertMUI from "../components/AlertMUI";
import ManageTable from "../components/ManageTable";
import UploadIcon from "@mui/icons-material/Upload";

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
  const [job, setJob] = useState("employed");
  const [vacationdata, setVacationData] = useState([]);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = (e) => {
    let image = e.target.files[0];
    
    
    let reader = new FileReader();
    reader.onloadend = () => {
      const fileData = {
        file: image,
        fileName: reader.result,
      };
      setFile(fileData);
    };
    
    if (image) {
      setPicture(image.name);
      reader.readAsDataURL(image);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    if (severity === "success" && type === "company") {
      navigate("/dashboard");
    } else if (severity === "success" && type === "employee") {
      navigate(`/employee/${id}`);
    } else if (severity === "warning") {
      navigate("/dashboard");
    }
  };

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
        setLocation(response[0].data.location);
        setActivity(response[0].data.activity);
        setPicture(response[0].data.picture_png);
        setDate(new Date(response[0].data.lauch_date));
      });
    } else {
      Promise.all([
        api.get(`/employees/${id}/`),
        api.get(`/employee_companies/?employee_id=${id}`),
        api.get(`/companies/`),
        api.get(`/employee_company_vacations/?employee_id=${id}`),
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
          response[1].data[response[1].data.length - 1].date_left === null
            ? null
            : new Date(response[1].data[response[1].data.length - 1].date_left)
        );
        setJobId(response[1].data[response[1].data.length - 1].id);
        setVacationData(response[3].data);
      });
    }
  }, []);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const lastItem = employee.length > 0 ? employee[employee.length - 1] : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "company") {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("activity", activity);
      formData.append("lauch_date", date.toISOString().substring(0, 10));
      formData.append("location", location);
      formData.append("picture", picture);
      formData.append("picture_png", file.file);
      api
        .put(`/companies/${id}/`, formData)
        .then((response) => {
          setSeverity("success");
          setMessage("Company updated successfully!");
          setOpen(true);
        })
        .catch((error) => {
          console.error("An error occurred:", error);
          if (error.response && error.response.status === 400) {
            setSeverity("error");
            setMessage("Bad Request. Please check your inputs.");
            setOpen(true);
          } else {
            setSeverity("error");
            setMessage("An error occurred: " + error.message);
            setOpen(true);
          }
        });
    } else {
      if (checked && leftdate < date) {
        setSeverity("error");
        setMessage("Left date must be after joined date!");
        setOpen(true);
        return;
      }
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
      ])
        .then((response) => {
          if (vacation) {
            if (
              vacationdata.length === 0 ||
              vacationdata[vacationdata.length - 1].date_end !== null
            ) {
              api
                .post(`/employee_company_vacations/`, {
                  employee_company: jobid,
                  date_start: new Date().toISOString().substring(0, 10),
                })
                .then((response) => {
                  setSeverity("success");
                  setMessage("Employee updated successfully!");
                  setOpen(true);
                })
                .catch((error) => {
                  console.error("An error occurred:", error);
                  if (error.response && error.response.status === 400) {
                    setSeverity("error");
                    setMessage("Bad Request. Please check your inputs.");
                    setOpen(true);
                  } else {
                    setSeverity("error");
                    setMessage("An error occurred: " + error.message);
                    setOpen(true);
                  }
                });
            } else if (
              vacationdata[vacationdata.length - 1].date_end === null
            ) {
              setSeverity("success");
              setMessage("Employee updated successfully!");
              setOpen(true);
            }
          } else if (!vacation) {
            if (vacationdata.length === 0) {
              setSeverity("success");
              setMessage("Employee updated successfully!");
              setOpen(true);
            } else if (
              vacationdata[vacationdata.length - 1].date_end === null
            ) {
              api
                .put(
                  `/employee_company_vacations/${
                    vacationdata[vacationdata.length - 1].id
                  }/`,
                  {
                    employee_company: jobid,
                    date_start:
                      vacationdata[vacationdata.length - 1].date_start,
                    date_end: new Date().toISOString().substring(0, 10),
                  }
                )
                .then((response) => {
                  setSeverity("success");
                  setMessage("Employee updated successfully!");
                  setOpen(true);
                })
                .catch((error) => {
                  console.error("An error occurred:", error);
                  if (error.response && error.response.status === 400) {
                    setSeverity("error");
                    setMessage("Bad Request. Please check your inputs.");
                    setOpen(true);
                  } else {
                    setSeverity("error");
                    setMessage("An error occurred: " + error.message);
                    setOpen(true);
                  }
                });
            } else {
              setSeverity("success");
              setMessage("Employee updated successfully!");
              setOpen(true);
            }
          } else {
            setSeverity("success");
            setMessage("Employee updated successfully!");
            setOpen(true);
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
          if (error.response && error.response.status === 400) {
            setSeverity("error");
            setMessage("Bad Request. Please check your inputs.");
            setOpen(true);
          } else {
            setSeverity("error");
            setMessage("An error occurred: " + error.message);
            setOpen(true);
          }
        });
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (type === "company") {
      api.delete(`/companies/${id}/`).then((response) => {
        setSeverity("success");
        setMessage(`${name} deleted successfully!`);
        setOpen(true);
      });
    } else {
      api.delete(`/employees/${id}/`).then((response) => {
        setSeverity("warning");
        setMessage(`${name} deleted of the database!`);
        setOpen(true);
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
        >
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <IconButton
              aria-label="back"
              onClick={() =>
                type === "company"
                  ? navigate("/dashboard")
                  : navigate(`/employee/${id}`)
              }
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
                        value={leftdate === null ? new Date() : leftdate}
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

              <Grid item xs={3} sm={4} md={4} display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
                {type === "company" ? (
                  <>
                  <label htmlFor="upload-photo">
                    <input
                      style={{ display: "none" }}
                      id="upload-photo"
                      name="upload-photo"
                      type="file"
                      onChange={handleUpload}
                      accept="image/png, image/svg+xml"
                    />

                    <Button
                      sx={{ backgroundColor: "#0E6BA8", color : "#fff","&:hover" : { backgroundColor : "#107ac0" } }}
                      variant="contained"
                      component="span"
                      endIcon={<UploadIcon />}
                    >
                      Upload Photo
                    </Button>
                  </label>
                  <Typography sx={{ marginLeft : 2, color : "#fff" }} variant="p" noWrap>
                    {file !== null ? picture : "No file selected"}
                  </Typography>
                  </>
                ) : (
                  <TextField
                    label={"Position"}
                    sx={{ width: "100%" }}
                    value={type === "company" ? picture : position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                )}
              </Grid>

              <Grid
                item
                xs={3}
                sm={type === "company" ? 8 : 7}
                md={type === "company" ? 8 : 7}
              >
                <TextField
                  label="Name"
                  sx={{ width: "100%" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              {type === "employee" && (
                <Grid
                  item
                  xs={3}
                  sm={1}
                  md={1}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <FlightTakeoffOutlinedIcon sx={{ color: "#fff" }} />
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
              )}

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
            xs={12}
            sm={type === "company" ? 8 : 12}
            md={type === "company" ? 6 : 12}
            lg={type === "company" ? 5 : 12}
            xl={type === "company" ? 5 : 12}
            sx={{ marginBottom: 3 }}
          >
            {type === "company" ? (
              <CompanyCard
                img={file !== null ? file.fileName : picture}
                activity={activity}
                launchDate={date}
                location={location}
                edit={true}
              />
            ) : (
              lastItem && (
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <JobInfo
                    data={employee}
                    position={position}
                    company={companyname}
                    name={name}
                    vacation={vacation}
                  />
                </Grid>
              )
            )}
          </Grid>
        </Grid>
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
      <AlertMUI
        open={open}
        handleClose={handleClose}
        message={message}
        severity={severity}
      />
    </div>
  );
}
