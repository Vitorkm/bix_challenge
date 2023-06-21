import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import EmployeeTimeline from "../components/EmployeeTimeline";
import Box from "@mui/material/Box";





export default function EmployeeInfo() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get(`/employee_companies/${id}/`).then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div>
        <Typography variant="h4" sx={{ color : "#fff", m : 2, backgroundColor : "#383838", width : "fit-content", p : 1.5, borderRadius : "10rem"}} component="div" >
          {data.employee_name}
        </Typography>
        <Typography variant="h5" sx={{ color : "#fff", m : 5, pl : 3}} component="div" >
          Informações do funcionário:
        </Typography>
        <Stack direction="row" spacing={2} sx={{ m : 5, pl : 3}} justifyContent={"space-around"}>
          <Chip label={`Role: ${data.position}`}  sx={{ p : 3, fontSize : "1rem" }}/>
          <Chip label={`Current Company: ${data.company_name}`} sx={{ p : 3, fontSize : "1rem" }} />
          <Chip label={`Admission Date: ${data.date_joined}`}  sx={{ p : 3, fontSize : "1rem" }} />
          <Chip label={`Is on Vacation? ${data.on_vacation ? "Yes" : "No"}`} sx={{ p : 3, fontSize : "1rem" }} />
        </Stack>
        <Box sx={{ marginTop : 10 }}>
        <EmployeeTimeline id={id} />
        </Box>
    </div>
  );
}
