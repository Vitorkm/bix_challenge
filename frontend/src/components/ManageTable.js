import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useAxios from "../services/api";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EditModal from "./EditModal";
import { useNavigate } from "react-router-dom";

export default function ManageTable() {
  const api = useAxios();
  const [jobs, setJobs] = useState([]);
  const [vacations, setVacations] = useState([]);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const { id } = useParams();
  const [data, setData] = useState({
    id : 0,
    company_name : "",
    position : "",
    date_start : "",
    date_end : "",
    name : "",
    vacation : false,
    employee_company : 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      api.get(`/employee_companies/?employee_id=${id}`),
      api.get(`/employee_company_vacations/?employee_id=${id}`),
    ])
      .then((response) => {
        setJobs(response[0].data);
        setVacations(response[1].data);
        console.log(response[0].data);
        console.log(response[1].data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
      <>
    <Grid container >
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginTop: 3}}>
      <Typography
              variant="h5"
              sx={{
                color: "#fff",
                backgroundColor: "#060d27",
                width: "fit-content",
                p: 1.5,
                borderRadius: "10px",
                marginBottom: 3,
              }}
              component="div"
            >
              Job History
            </Typography>
          </Grid>
        <Grid item xs={12}>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer
            sx={{
              maxHeight: 450,
              "&::-webkit-scrollbar": {
                width: 10,
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#1e1e1e",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#121212",
                borderRadius: 2,
              },
            }}
          >
            <Table
              sx={{ minWidth: 650 }}
              aria-label="sticky table"
              stickyHeader
            >
              <TableHead>
                <TableRow>
                  <TableCell align="left">Role</TableCell>
                  <TableCell align="left">Company</TableCell>
                  <TableCell align="left">Start Date</TableCell>
                  <TableCell align="left">Left Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{
                      transition: "0.5s",
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": {
                        backgroundColor: "#060d27",
                        cursor: "pointer",
                        boxShadow: "0px 0px 5px #060d27",
                      },
                    }}
                onClick={() => {setOpen(true); setType("job"); setData({
                    id : row.id,
                    company_name : row.company_name,
                    position : row.position,
                    date_start : row.date_joined,
                    date_end : row.date_left,
                    name : row.name,
                    vacation : row.on_vacation,
                })}}
                  >
                    <TableCell align="left">{row.position}</TableCell>
                    <TableCell align="left">{row.company_name}</TableCell>
                    <TableCell align="left">
                      {new Date(row.date_joined).toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell align="left"> 
                      {row.date_left !== null ? new Date(row.date_left).toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      }) : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 3}}>
      <Typography
              variant="h5"
              sx={{
                color: "#fff",
                backgroundColor: "#060d27",
                width: "fit-content",
                p: 1.5,
                borderRadius: "10px",
                marginBottom: 3,
              }}
              component="div"
            >
              Vacation History
            </Typography>
          </Grid>
        <Grid item xs={12}>
            {vacations.length === 0 ? (
                <Typography
                variant="h5"
                sx={{
                    color: "#fff",
                    p: 1.5,
                    borderRadius: "10px",
                    marginBottom: 3,
                    textAlign: "center",
                }}
                component="div"
                >
                No Vacation History
                </Typography>
            ) : 
        (<Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer
            sx={{
              maxHeight: 450,
              "&::-webkit-scrollbar": {
                width: 10,
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#1e1e1e",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#121212",
                borderRadius: 2,
              },
            }}
          >
            <Table
              sx={{ minWidth: 650 }}
              aria-label="sticky table"
              stickyHeader
            >
              <TableHead>
                <TableRow>
                  <TableCell align="left">Company</TableCell>
                  <TableCell align="left">Start Date</TableCell>
                  <TableCell align="left">End Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vacations.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      transition: "0.5s",
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": {
                        backgroundColor: "#060d27",
                        cursor: "pointer",
                        boxShadow: "0px 0px 5px #060d27",
                      },
                    }}
                    onClick={() => {setOpen(true); setType("vacation"); setData({
                        id : row.id,
                        employee_company : row.employee_company,
                        date_start : row.date_start,
                        date_end : row.date_end,
                        company_name : row.company_name,
                    })}}
                  >
                    <TableCell align="left">{row.company_name}</TableCell>
                    <TableCell align="left">
                      {new Date(row.date_start).toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell align="left">
                      {row.date_end === null
                        ? "-"
                        : new Date(row.date_end).toLocaleDateString("en-US", {
                            month: "2-digit",
                            day: "2-digit",
                            year: "numeric",
                          })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
            </Paper>) }
        </Grid>
    </Grid>
    <EditModal open={open} 
    setOpen={setOpen} 
    type={type} 
    company={data.company_name}
    dateStart={data.date_start}
    dateEnd={data.date_end}
    position={data.position}
    id={data.id}
    vacation={data.vacation}
    employeeCompany={data.employee_company}
    />
    </>
  );
}
