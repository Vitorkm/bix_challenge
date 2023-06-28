import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useAxios from "../services/api";
import { useNavigate } from "react-router-dom";

export default function EmployeeTable(props) {
  const api = useAxios();
  const { employee, edit, job } = props;
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!edit) {
      api.get(`/employee_companies/`).then((response) => {
        setEmployees(response.data);
        console.log(response.data);
      });
    }
  }, []);

  useEffect(() => {
    if (edit) {
      setEmployees(props.employees);
    }
  }, [props.employees]);

  return (
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
        <Table sx={{ minWidth: 650 }} aria-label="sticky table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Company</TableCell>
              <TableCell align="left">Start Date</TableCell>
              <TableCell align="left">On Vacation</TableCell>
              {job === "unemployed" && (
                <TableCell align="left">Left Date</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {employees
              .filter(
                (item) =>
                  (employee ? item.employee_name.includes(employee) : item) &&
                  (job === "unemployed"
                    ? item.date_left !== null
                    : item.date_left === null)
              )
              .map((row) => (
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
                  onClick={() => navigate(`/employee/${row.employee_id}`)}
                >
                  <TableCell component="th" scope="row">
                    {row.employee_name}
                  </TableCell>
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
                    {row.on_vacation ? "Yes" : "No"}
                  </TableCell>
                  {job === "unemployed" && (
                    <TableCell align="left">
                      {new Date(row.date_left).toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
