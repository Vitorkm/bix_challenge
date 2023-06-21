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
        console.log(response.data)
      });
    }
  }, [open]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#121212",
    padding: theme.spacing(1),
    textAlign: "center",
    color: "#EEEEF0",
    flexGrow: 1,
    width: "50%",
    borderRadius: "10px",
  }));

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#33323d",
    border: "1px solid #33323d",
    borderRadius: "10px",
    boxShadow: "20px 20px 50px",
    width: "50%",
    height: "50%",
    p: 4,
    pt: 0,
  };

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
            backgroundColor: "transparent",
            filter: "drop-shadow(5px 5px 5px #222)",
          },
        }}
        onClick={handleOpen}
      >
        <Grid container justifyContent={"center"} alignItems={"center"}>
          <Grid item xs={12} style={{ textAlign: "center", marginTop: "1rem"}}>
            <img
              src={props.img}
              style={{
                width: "11rem",
                height: "12.5rem",
                borderRadius: "0.5rem",
                objectFit: "contain",
                filter: "drop-shadow(5px 5px 5px #222)"
              }}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center", margin: "1rem" }}>
            <Stack direction="row" spacing={2}>
              <Item>{props.activity}</Item>
              <Item>{props.launchDate}</Item>
            </Stack>
          </Grid>
          <Grid item xs={12} style={{ display: "flex", margin: "1rem" }}>
            <Item>{props.location}</Item>
          </Grid>
        </Grid>
      </Card>
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
              sx={{ mt: 3.5, color : "#EEEEF0" }}
            >
              Lista de funcionários da {props.name}:
            </Typography>
            <img
              src={props.img}
              alt="logo"
              style={{ width: "100px", height: "80px", objectFit: "contain",
              filter: "drop-shadow(5px 5px 5px #222)"
            }}
            />
          </Stack>
          <Stack
            sx={{
              width: "100%",
              bgcolor: "#121212",
              borderRadius: "10px",
              mt: 2,
              filter: "drop-shadow(5px 5px 5px #222)"
            }}
          >
            <List
              disablePadding
              sx={{
                position: "relative",
                overflow: "auto",
                height: { xs: "10rem", sm: "16.25rem", md: "18.75rem", xl: "31.25rem" },
                overflowY: "scroll",
                scrollbarWidth: "thin",
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#888",
                  borderRadius: "15px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#555",
                },
              }}
            >
              {employees.map((employee) => (
                <>
                  <ListItem
                    disablePadding
                    sx={{ color: "#F3F9D2", "&:hover": { color: "#fff" } }}
                  >
                    <ListItemButton onClick={() => navigate(`/employee/${employee.id}`)}>
                      <ListItemText primary={employee.employee_name} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              ))}
            </List>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}