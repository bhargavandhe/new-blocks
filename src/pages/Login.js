import { React, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useHistory } from "react-router-dom";
import { Grid, IconButton } from "@mui/material";
import { validate } from "../helpers/validator";
import { RefreshRounded } from "@mui/icons-material";
import { login } from "../helpers/database";
import { db } from "../fire";

function Login() {
  const history = useHistory();
  const [inputs, setInputs] = useState({
    aadhar: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    aadhar: "",
    password: "",
  });

  const handleInput = (prop) => (event) => {
    setInputs({ ...inputs, [prop]: event.target.value });
    validate(prop, event.target.value, errors, setErrors);
  };

  function handleSubmit() {
    login(inputs.aadhar, inputs.password).then((res) => {
      history.push("/");
    });
  }

  return (
    <Container>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Please login into your account
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Aadhar number"
            name="aadhar"
            autoFocus
            value={inputs.aadhar}
            onChange={handleInput("aadhar")}
            error={Boolean(errors.aadhar)}
            helperText={errors.aadhar}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="password"
            label="Password"
            name="password"
            value={inputs.password}
            onChange={handleInput("password")}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
