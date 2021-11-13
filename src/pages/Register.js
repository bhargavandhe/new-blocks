import { React, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme } from "@mui/material/styles";

import { Grid, IconButton } from "@mui/material";
import { validate } from "../helpers/validator";
import { generateCaptcha, getEkyc, sendOTP } from "../helpers/aadharApi";
import { RefreshRounded } from "@mui/icons-material";
import { register } from "../helpers/database";
import { ekyc } from "./ekyc copy";
import { useHistory } from "react-router-dom";

const theme = createTheme();

function Register() {
  const navigate = useHistory();

  const [results, setResults] = useState({
    captcha: "",
    otp: "",
  });

  const [inputs, setInputs] = useState({
    aadhar: "",
    captcha: "",
    otp: "",
    password: "",
  });

  const [states, setStates] = useState({
    otpSent: true,
    otpVerified: true,
  });

  const [errors, setErrors] = useState({
    aadhar: "",
    captcha: "",
    otp: "",
    password: "",
  });

  const handleInput = (prop) => (event) => {
    setInputs({ ...inputs, [prop]: event.target.value });
    validate(prop, event.target.value, errors, setErrors);
  };

  function handleSubmit() {
    if (!states.otpSent) {
      sendOTP(inputs.aadhar, results.captcha.captchaTxnId, inputs.captcha).then(
        (res) => {
          if (res.data.status === "Success") {
            setStates({ ...states, otpSent: true });
            setResults({ ...results, otp: res.data });
          } else if ((res.data.status = "Invalid Captcha")) {
            setErrors({ ...errors, captcha: res.data.status });
          }
        }
      );
    } else {
      getEkyc(results.otp.txnId, inputs.otp, inputs.aadhar).then((res) => {
        console.log(res);
        setStates({
          ...states,
          otpVerified: res["KycRes"]["_attributes"].ret == "Y",
        });
        register(inputs.aadhar, inputs.password, res);
        navigate.push("/login");
      });
    }
  }

  function _generateCaptcha() {
    setStates({ ...states, otpSent: false });
    setInputs({ ...inputs, captcha: "", otp: "" });
    setResults({ ...results, otp: "" });
    generateCaptcha().then((res) => {
      setResults({ ...results, captcha: res.data });
    });
  }

  useEffect(() => {
    _generateCaptcha();
  }, []);

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
          Please enter your details
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
          <Grid container alignItems="center">
            <Grid item>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Captcha"
                name="captcha"
                value={inputs.captcha}
                onChange={handleInput("captcha")}
                error={Boolean(errors.captcha)}
                helperText={errors.captcha}
              />
            </Grid>
            <Grid item>
              <img
                alt="captcha"
                src={
                  results.captcha.captchaBase64String
                    ? `data:image/png;base64,${results.captcha.captchaBase64String}`
                    : ""
                }
              />
            </Grid>
            <Grid item>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  _generateCaptcha();
                }}
              >
                <RefreshRounded />
              </IconButton>
            </Grid>
          </Grid>
          <TextField
            margin="normal"
            required
            fullWidth
            label="OTP"
            name="otp"
            value={inputs.otp}
            disabled={!states.otpSent}
            onChange={handleInput("otp")}
            error={Boolean(errors.otp)}
            helperText={errors.otp}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="password"
            label="Password"
            name="password"
            value={inputs.password}
            disabled={!states.otpVerified}
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
            {states.otpSent
              ? states.otpVerified
                ? "Register"
                : "Validate"
              : "Send OTP"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
