import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import BixLogo from "../utils/images/bix_logo.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();
  const HeightLogoBix = "160px";
  const WidthLogoBix = "auto";

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("username"),
      password: data.get("password"),
    });

    navigate("/dashboard");
  };

  return (

      <Container maxWidth sx={{ backgroundColor: "#121212" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
          component="form"
          onSubmit={handleSubmit}
        >
          <Stack spacing={2} direction="column" alignItems="center">
            <img
              alt="Bix logo"
              style={{ height: HeightLogoBix, width: WidthLogoBix }}
              src={BixLogo}
            ></img>

            <TextField
              id="outlined-basic"
              label="Usuário"
              variant="outlined"
              name="username"
              margin="normal"
              required
              sx={{
                width: "25rem",
              }}
            />
            <TextField
              id="outlined-basic"
              label="Senha"
              variant="outlined"
              type="password"
              name="password"
              margin="normal"
              required
              sx={{
                width: "25rem",
              }}
            />
            <Button
              variant="contained"
              sx={{
                width: "25rem",
                color: "#fff",
                backgroundColor: "#275CAB",

                "&:hover": {
                  backgroundColor: "#292929",
                },
              }}
              type="submit"
            >
              Entrar
            </Button>
          </Stack>
        </Box>
      </Container>

  );
}
