import { Typography, Card, Grid, Box } from "@mui/material";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function InputFileCard(props) {
  const { name, description } = props;
  const [isUpdating, setIsUpdating] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [time, setTime] = useState(new Date());

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (percentage < 99 && percentage >= 50) {
      setPercentage(percentage + 1);
    }
  }, [time]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#101010",
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    flexGrow: 1,
    width: "50%",
    borderRadius: "10px",
  }));

  return (
    <div>
      <Card
        sx={{
          backgroundColor: "#000",
          color: "#fff",
          transition: "0.5s",
          cursor: "pointer",
          borderRadius: "10px",
          border: "1px solid #ABABAB",
          "&:hover": {
            border: "1px solid #275CAB",
            background: "transparent",
          },
        }}
        onClick={handleOpen}
      >
        <Grid container justifyContent={"center"} alignItems={"center"}>
          <Grid item xs={12} style={{ textAlign: "center", marginTop: "1rem" }}>
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: "0.5re", sm: "1rem", md: "1.5rem", xl: "2rem" },
                color: "#fff",
              }}
            >
              {props.name}
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center", marginTop: "1rem" }}>
            <img
              src={props.img}
              style={{
                width: "30rem",
                height: "15rem",
                borderRadius: "0.5rem",
                objectFit: "contain",
              }}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center", margin: "1rem" }}>
            <Stack direction="row" spacing={2}>
              <Item>{props.activity}</Item>
              <Item>{props.launchDate}</Item>
            </Stack>
          </Grid>
          <Grid item xs={8} style={{ display: "flex", margin: "1rem" }}>
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
