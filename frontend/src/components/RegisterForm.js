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
import MenuItem from "@mui/material/MenuItem";
import JobInfo from "../components/JobInfo";
import useAxios from "../services/api";
import AlertMUI from "../components/AlertMUI";
import UploadIcon from "@mui/icons-material/Upload";


export default function Register() {
  const { nome } = useParams();
  const api = useAxios();
  const [company, setCompany] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [type, setType] = useState("employee");
  const [companyname, setCompanyName] = useState("");
  const [date, setDate] = useState(new Date());
  const [picture, setPicture] = useState("");
  const [name, setName] = useState(nome ? nome : "");
  const [location, setLocation] = useState("");
  const [position, setPosition] = useState("");
  const [activity, setActivity] = useState("");
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
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
    if (severity === "success") {
      navigate("/dashboard");
    }
  };

  const data = [
    {
      companyname: companyname,
      position: position,
      name: name,
    },
  ];

  useEffect(() => {
    Promise.all([
      api.get("/companies/"),
      api.get("/employees/"),
      api.get("/employee_companies/"),
    ]).then((response) => {
      setCompany(response[0].data);
      setEmployee(response[1].data);
      setJobs(response[2].data);
    });
  }, []);

  const handleChange = () => {
    setActivity("");
    setCompanyName("");
    setDate(new Date());
    setLocation("");
    setName("");
    setPosition("");
    setPicture("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "employee") {
      let activejob = jobs.filter((item) => item.employee_name === name);
      if (employee.filter((item) => item.name === name).length === 0) {
        api
          .post("/employees/", {
            name: name,
          })
          .then((response) => {
            api
              .post("/employee_companies/", {
                employee_name: name,
                company_name: companyname,
                position: position,
                date_joined: date.toISOString().substring(0, 10),
                date_left: null,
                on_vacation: false,
              })
              .then((response) => {
                setSeverity("success");
                setMessage("Employee Registered Successfully!");
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
        if ((activejob.length === 0) || (activejob[activejob.length - 1].date_left !== null)) {
          api
            .post("/employee_companies/", {
              employee_name: name,
              company_name: companyname,
              position: position,
              date_joined: date.toISOString().substring(0, 10),
              date_left: null,
              on_vacation: false,
            })
            .then((response) => {
              setSeverity("success");
              setMessage("Employee Registered Successfully!");
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
          setSeverity("error");
          setMessage(
            `Employee is already working on ${
              activejob[activejob.length - 1].company_name
            }!`
          );
          setOpen(true);
        }
      }
    } else {
      if (file) {
        
      let formData = new FormData();
      formData.append("name", name);
      formData.append("activity", activity);
      formData.append("lauch_date", date.toISOString().substring(0, 10));
      formData.append("location", location);
      formData.append("picture", picture);
      formData.append("picture_png", file.file);
      api
        .post("/companies/", formData)
        .then((response) => {
          setSeverity("success");
          setMessage("Company Registered Successfully!");
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
        setSeverity("error");
        setMessage("Bad Request. Please check your inputs.");
        setOpen(true);
        return;
      }
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
              Register a new {type}
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
                <TextField
                  select
                  label="Type"
                  sx={{ width: "100%" }}
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                    handleChange();
                  }}
                >
                  <MenuItem value="employee">Employee</MenuItem>
                  <MenuItem value="company">Company</MenuItem>
                </TextField>
              </Grid>

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
                      type === "employee" ? "Admission Date" : "Launch Date"
                    }
                    sx={{ width: "100%" }}
                    inputFormat="YYYY-MM-DD"
                    value={date}
                    onChange={(value) => setDate(value)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              {type === "company" && (
                <Grid item xs={3} sm={4} md={4} display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
                  
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
                </Grid>
              )}
              <Grid item xs={3} sm={4} md={4}>
                <TextField
                  label={type === "employee" ? "Position" : "Location"}
                  sx={{ width: "100%" }}
                  value={type === "employee" ? position : location}
                  onChange={(e) =>
                    type === "employee"
                      ? setPosition(e.target.value)
                      : setLocation(e.target.value)
                  }
                />
              </Grid>
              <Grid
                item
                xs={3}
                sm={type === "employee" ? 8 : 4}
                md={type === "employee" ? 8 : 4}
              >
                <TextField
                  label="Name"
                  sx={{ width: "100%" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>

              <Grid item xs={3} sm={8} md={8}>
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
                  Submit Register
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </div>
        {type === "company" ? (
          <Grid
            container
            xs={12}
            justifyContent={"center"}
            sx={{
              marginBottom: 10,
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
                Preview Card
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={6} lg={5} xl={5}>
              <CompanyCard
                edit={true}
                img={file ? file.fileName : "company_logo_example.png"}
                activity={activity ? activity : "Company Activity"}
                launchDate={date}
                location={location ? location : "Company Location"}
              />
            </Grid>
          </Grid>
        ) : (
          <JobInfo data={data} />
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
