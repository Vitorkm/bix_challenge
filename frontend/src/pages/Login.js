import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import BixLogo from "../utils/images/bix_logo.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";


export default function Login() {
  const { loginUser } = useContext(AuthContext);
  const WidthLogoBix = "350px";

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");
    username.length > 0 && loginUser(username, password);
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
              style={{ width: WidthLogoBix }}
              src={BixLogo}
            ></img>

            <TextField
              id="outlined-basic"
              label="Usuário"
              variant="outlined"
              name="username"
              margin="normal"
              required

              fullWidth
            />
            <TextField
              id="outlined-basic"
              label="Senha"
              variant="outlined"
              type="password"
              name="password"
              margin="normal"
              required
              fullWidth
            />
            <Button
              variant="contained"
              sx={{
                color: "#fff",
                backgroundColor: "#275CAB",

                "&:hover": {
                  backgroundColor: "#292929",
                },
              }}
              type="submit"
              fullWidth
            >
              Entrar
            </Button>
          </Stack>
        </Box>
      </Container>

  );
}
