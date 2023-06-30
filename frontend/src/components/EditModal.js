import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import useAxios from "../services/api";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import AlertMUI from "./AlertMUI";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "fit-content",
  bgcolor: "#33323d",
  borderRadius: "10px",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: 4,
  "&:focus": {
    outline: "none",
  },
};

export default function EditModal(props) {
  const {
    open,
    setOpen,
    type,
    company,
    dateStart,
    dateEnd,
    position,
    id,
    employeeCompany,
  } = props;
  const api = useAxios();

  const handleClose = () => setOpen(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [role, setRole] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
    if (severity === "success") {
      window.location.reload();
      setOpen(false);
    }
  };

  useEffect(() => {
    setStartDate(new Date(dateStart));
    setEndDate(dateEnd === null ? null : new Date(dateEnd));
    setRole(position);
  }, [open]);

  const handleSubmit = () => {
    if ((endDate !== null) && (endDate < startDate)) {
      setSeverity("error");
      setMessage(type === "job" ? "Left date must be after joined date!" : "End date must be after start date!");
      setOpenAlert(true);
      return;
    }
    if (type === "job") {
      api
        .patch(`/employee_companies/${id}/`, {
          position: position,
          date_joined: startDate.toISOString().substring(0, 10),
          date_left:
            endDate !== null ? endDate.toISOString().substring(0, 10) : null,
        })
        .then((response) => {
          setSeverity("success");
          setMessage("Job updated successfully!");
          setOpenAlert(true);
        })
        .catch((error) => {
          console.error("An error occurred:", error);
          if (error.response && error.response.status === 400) {
            setSeverity("error");
            setMessage("Bad Request. Please check your inputs.");
            setOpenAlert(true);
          } else {
            setSeverity("error");
            setMessage("An error occurred: " + error.message);
            setOpenAlert(true);
          }
        });
    } else {
      if (endDate !== null) {
        Promise.all([
          api.put(`/employee_company_vacations/${id}/`, {
            employee_company: employeeCompany,
            date_start: startDate.toISOString().substring(0, 10),
            date_end: endDate.toISOString().substring(0, 10),
          }),
          api.patch(`/employee_companies/${employeeCompany}/`, {
            on_vacation: false,
          }),
        ])
          .then((response) => {
            setSeverity("success");
            setMessage("Vacation updated successfully!");
            setOpenAlert(true);
          })
          .catch((error) => {
            console.error("An error occurred:", error);
            if (error.response && error.response.status === 400) {
              setSeverity("error");
              setMessage("Bad Request. Please check your inputs.");
              setOpenAlert(true);
            } else {
              setSeverity("error");
              setMessage("An error occurred: " + error.message);
              setOpenAlert(true);
            }
          });
      } else {
        api
          .put(`/employee_company_vacations/${id}/`, {
            employee_company: employeeCompany,
            date_start: startDate.toISOString().substring(0, 10),
            date_end: null,
          })
          .then((response) => {
            setSeverity("success");
            setMessage("Vacation updated successfully!");
            setOpenAlert(true);
          })
          .catch((error) => {
            console.error("An error occurred:", error);
            if (error.response && error.response.status === 400) {
              setSeverity("error");
              setMessage("Bad Request. Please check your inputs.");
              setOpenAlert(true);
            } else {
              setSeverity("error");
              setMessage("An error occurred: " + error.message);
              setOpenAlert(true);
            }
          });
      }
    }
  };

  const handleDelete = () => {
    if (type === "job") {
      api
        .delete(`/employee_companies/${id}/`)
        .then((response) => {
          setSeverity("success");
          setMessage("Job deleted successfully!");
          setOpenAlert(true);
        })
        .catch((error) => {
          console.error("An error occurred:", error);
          if (error.response && error.response.status === 400) {
            setSeverity("error");
            setMessage("Bad Request. Please check your inputs.");
            setOpenAlert(true);
          } else {
            setSeverity("error");
            setMessage("An error occurred: " + error.message);
            setOpenAlert(true);
          }
        });
    } else {
      api
        .delete(`/employee_company_vacations/${id}/`)
        .then((response) => {
          setSeverity("success");
          setMessage("Vacation deleted successfully!");
          setOpenAlert(true);
        })
        .catch((error) => {
          console.error("An error occurred:", error);
          if (error.response && error.response.status === 400) {
            setSeverity("error");
            setMessage("Bad Request. Please check your inputs.");
            setOpenAlert(true);
          } else {
            setSeverity("error");
            setMessage("An error occurred: " + error.message);
            setOpenAlert(true);
          }
        });
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "#fff",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: "#fff" }}
          >
            Edit {type === "job" ? "Job" : "Vacation"} Details:
          </Typography>

          <TextField
            id="outlined-basic"
            label="Company"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            value={company}
            sx={{ width: "100%", mt: 3 }}
          />
          {type === "job" && (
            <TextField
              id="outlined-basic"
              label="Role"
              variant="outlined"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              sx={{ width: "100%", mt: 3 }}
            />
          )}
          <Stack spacing={2} sx={{ mt: 3, width : "100%" }} direction={{ xs : "column", sm : "row"}}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Date Started"
                sx={{ width: "100%" }}
                inputFormat="YYYY-MM-DD"
                value={startDate}
                onChange={(value) => setStartDate(value)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Date Ended"
                sx={{ width: "100%" }}
                inputFormat="YYYY-MM-DD"
                value={endDate !== null ? endDate : new Date()}
                onChange={(value) => setEndDate(value)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Stack>
          <Stack spacing={2} sx={{ mt: 3, width: "100%" }} direction={"row"}>
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
              {type === "job" ? "Delete Job" : "Delete Vacation"}
            </Button>
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
          </Stack>
        </Box>
      </Modal>
      <AlertMUI
        open={openAlert}
        handleClose={handleAlertClose}
        message={message}
        severity={severity}
      />
    </div>
  );
}
