import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
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

export default function Register() {
  const [company, setCompany] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [date, setDate] = useState(new Date());
  const [picture, setPicture] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [activity, setActivity] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const formatDate = (date) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };
    return date.toLocaleString("en-US", options);
  };

  useEffect(() => {
    Promise.all([
      api.get(`/companies/${id}/`),
      api.get(`/employee_companies/?company_id=${id}`),
    ]).then((response) => {
      setCompany(response[0].data);
      setEmployee(response[1].data);
      setName(response[0].data.name);
      setLocation(response[0].data.location);
      setActivity(response[0].data.activity);
      setPicture(response[0].data.picture);
      setDate(new Date(response[0].data.lauch_date));
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
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
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    api.delete(`/companies/${id}/`).then((response) => {
      console.log(response.data);
      alert(`${name} deleted successfully!`);
      navigate("/dashboard");
    });
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
                <TextField
                  label={"Activity"}
                  sx={{ width: "100%", select: { color: "#fff" } }}
                  inputProps={{
                    color: "#fff",
                  }}
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                />
              </Grid>

              <Grid item xs={3} sm={4} md={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label={"Launch Date"}
                    sx={{ width: "100%" }}
                    inputFormat="YYYY-MM-DD"
                    value={date}
                    onChange={(value) => setDate(value)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={3} sm={4} md={4}>
                <TextField
                  label={"Location"}
                  sx={{ width: "100%" }}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Grid>

              <Grid item xs={3} sm={4} md={4}>
                <TextField
                  label="Picture Link"
                  sx={{ width: "100%" }}
                  value={picture}
                  onChange={(e) => setPicture(e.target.value)}
                />
              </Grid>

              <Grid item xs={3} sm={8} md={8}>
                <TextField
                  label="Name"
                  sx={{ width: "100%" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  Delete Company
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
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 10,
            backgroundColor: "#1e1e1e",
            borderColor: "#1e1e1e",
            border: "10px solid #1e1e1e",
            borderRadius: "10px",
          }}
        >
          <CompanyCard
            img={picture}
            activity={activity}
            launchDate={date}
            location={location}
            edit={true}
          />
        </Grid>
        <Grid
          item
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
          <CompanyCard
            img={picture}
            activity={activity}
            launchDate={date}
            location={location}
            edit={true}
          />
        </Grid>
      </Grid>
    </div>
  );
}
