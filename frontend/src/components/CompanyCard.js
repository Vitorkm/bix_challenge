import { Typography, Card, Grid, Box } from "@mui/material";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CircularProgress from "@mui/material/CircularProgress";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import EmployeeList from "./EmployeeList";

export default function CompanyCard(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const company = String(props.id);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      api.get(`/employee_companies/?company_id=${company}`).then((response) => {
        setEmployees(response.data);
        console.log(response.data);
      });
    }
  }, [open]);


  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#33323d",
    borderRadius: "10px",
    boxShadow: "20px 20px 50px",
    width: "50%",
    height: "50%",
    p: 4,
    pt: 0,
    "&:focus": {
      outline: "none",
    },
  };

  const formattedDate = new Date(props.launchDate).toLocaleDateString("en-GB");

  return (
    <div>
      <Card
        sx={{
          backgroundColor: "#060d27",
          color: "#F3F9D2",
          transition: "0.2s",
          cursor: "pointer",
          borderRadius: "10px",
          border: "1px solid #060d27",
          "&:hover": {
            border: "1px solid #060d27",
            backgroundColor: "#202741",
          },
        }}
        onClick={props.edit ? null : handleOpen}
      >
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          direction="row"
        >
          {!props.edit &&
          <Grid item xs={12} sm={12} md={12} xl={12}>
          <IconButton
            disableRipple
            onClick={() => navigate(`/edit/company/${props.id}`)}
            aria-label="settings"
            style={{
              float: "right",
              color: "#71ddfb",
            }}
          >
            <SettingsIcon sx={{ "&:hover": { color: "#F3F9D2" } }} />
          </IconButton>
        </Grid>
          }
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <img
              src={props.img}
              style={{
                width: "11rem",
                height: "12.5rem",
                borderRadius: "0.5rem",
                objectFit: "contain",
                filter: "drop-shadow(5px 5px 5px #222)",
              }}
            />
          </Grid>
          <Grid
            container
            xs={12}
            justifyContent={"center"}
            alignItems={"center"}
            direction="row"
            spacing={2}
            sx={{ mb: "1rem" }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              xl={6}
              style={{ textAlign: "center" }}
            >
              <Stack
                sx={{
                  backgroundColor: "#1e1e1e",
                  padding: 1,
                  color: "#EEEEF0",
                  flexGrow: 1,
                  borderRadius: "10px",
                }}
                direction="row"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <BusinessRoundedIcon sx={{ pr: 0.6 }} />
                {props.activity}
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              xl={6}
              style={{ textAlign: "center" }}
            >
              <Stack
                sx={{
                  backgroundColor: "#1e1e1e",
                  padding: 1,
                  color: "#EEEEF0",
                  flexGrow: 1,
                  borderRadius: "10px",
                }}
                direction="row"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <WorkHistoryIcon sx={{ pr: 0.6 }} />
                {formattedDate}
              </Stack>
            </Grid>

            <Grid item xs={12} style={{ display: "flex" }}>
              <Stack
                sx={{
                  backgroundColor: "#1e1e1e",
                  padding: 1,
                  color: "#EEEEF0",
                  flexGrow: 1,
                  width: "50%",
                  borderRadius: "10px",
                }}
                direction="row"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <LocationOnRoundedIcon sx={{ pr: 0.3 }} />
                {props.location}
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Card>
      {!props.edit &&
      <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          maxWidth
        >
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            sx={{ mt: 3.5, color: "#EEEEF0" }}
          >
            Lista de funcionários da {props.name}:
          </Typography>
          <img
            src={props.img}
            alt="logo"
            style={{
              width: "100px",
              height: "80px",
              objectFit: "contain",
              filter: "drop-shadow(5px 5px 5px #222)",
            }}
          />
        </Stack>
        <EmployeeList employees={employees}/>
      </Box>
    </Modal>
      }
      
    </div>
  );
}
