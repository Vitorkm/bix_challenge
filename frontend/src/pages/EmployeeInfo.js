import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EmployeeTimeline from "../components/EmployeeTimeline";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import JobInfo from "../components/JobInfo";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import useAxios from "../services/api";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import AssignmentIcon from '@mui/icons-material/Assignment';
import Button from '@mui/material/Button';


export default function EmployeeInfo() {
  const { user } = useContext(AuthContext);
  const api = useAxios();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [timelinedata, setTimelineData] = useState([]);
  const navigate = useNavigate();
  const [unemployed, setUnemployed] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get(`/employee_companies/?employee_id=${id}`),
      api.get(`/timeline/?employee_id=${id}`),
    ]).then((allResponses) => {
      setData(allResponses[0].data);
      setTimelineData(allResponses[1].data);
      if ((allResponses[0].data.length === 0) || (allResponses[0].data[allResponses[0].data.length - 1].date_left !== null)) {
        setUnemployed(true);
      }
    });
  }, []);

  const lastItem = data.length > 0 ? data[data.length - 1] : null;
  

  return (
    <div>
      {lastItem ? (
        <Grid container>
          <Grid item display={"flex"} xs={12} sm={12} md={12} lg={12} xl={12} sx={{ marginBottom : 1 }} justifyContent={"space-between"}>
          <IconButton aria-label="back" onClick={() => navigate("/dashboard")}>
          <ArrowBackIcon />
        </IconButton>
        {unemployed ? (
          <Button variant="string" startIcon={<AssignmentIcon />} sx={{
            display: user.is_superuser ? "flex" : "none", color: "#fff", borderColor: "#fff"
          }} aria-label="back" onClick={() => navigate(`/register/${lastItem.employee_name}`)}>
            Hire Employee
          </Button>
        ) : (
        <IconButton sx={{
          display: user.is_superuser ? "block" : "none"
        }} aria-label="back" onClick={() => navigate(`/edit/employee/${id}`)}>
          <EditIcon />
        </IconButton>
        )}
          </Grid>
          <JobInfo data={data} unemployed={unemployed} />
          <EmployeeTimeline data={timelinedata} />
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
