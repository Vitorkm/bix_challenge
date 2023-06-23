import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EmployeeTimeline from "../components/EmployeeTimeline";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import FlightTakeoffOutlinedIcon from "@mui/icons-material/FlightTakeoffOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import JobInfo from "../components/JobInfo";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";


export default function EmployeeInfo() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/employee_companies/?employee_id=${id}`).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  }, []);

  const lastItem = data.length > 0 ? data[data.length - 1] : null;

  return (
    <div>
      {lastItem ? (
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ marginBottom : 1 }}>
          <IconButton aria-label="back" onClick={() => navigate("/dashboard")}>
          <ArrowBackIcon />
        </IconButton>
          </Grid>
          <JobInfo data={data} />
          <EmployeeTimeline data={data} />
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <CircularProgress size={100} />
        </Box>
      )}
    </div>
  );
}
