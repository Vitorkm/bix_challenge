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

export default function EmployeeInfo() {
  const { id } = useParams();
  const [data, setData] = useState([]);

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
          <Grid item xs={12} sx={{ display : "flex", justifyContent : "center" }} >
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              backgroundColor: "#060d27",
              width: "fit-content",
              p: 1.5,
              borderRadius: "10rem",
            }}            
            component="div"
          >
            {lastItem.employee_name}
          </Typography>
          </Grid>
          <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{ color: "#fff", mt : 2, mb : 2 }}
            component="div"
          >
            Informações do funcionário:
          </Typography>
          </Grid>
          <Grid container justifyContent={"space-evenly"}
            spacing={{ xs: 2, md: 3 }}
          >
            <Grid item xs={12} sm={6} md={4} xl={4}>
              <Chip
                label={`Role: ${lastItem.position}`}
                sx={{ p: 3, fontSize: "1rem", backgroundColor: "#060d27", width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={4}>
              <Chip
                label={`Company: ${lastItem.company_name}`}
                sx={{ p: 3, fontSize: "1rem", backgroundColor: "#060d27", width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={8} md={4} xl={4}>
              <Chip
                label={`Is on Vacation? ${lastItem.on_vacation ? "Yes" : "No"}`}
                sx={{ p: 3, fontSize: "1rem", backgroundColor: "#060d27", width: "100%" }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
          <Box sx={{ marginTop: 10 }}>
            <EmployeeTimeline id={id} />
          </Box>
          </Grid>
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}
