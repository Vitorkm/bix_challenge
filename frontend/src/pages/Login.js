import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import BixLogo from "../utils/images/bix_logo.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AuthContext from "../context/AuthContext";
import { useContext, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";



export default function Login() {
  const { loginUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const WidthLogoBix = "350px";
  const [password, setPassword] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
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
            <FormControl fullWidth variant="outlined" required>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          </FormControl>
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
