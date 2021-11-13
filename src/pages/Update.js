import { React, useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { validate } from "../helpers/validator";
import { Button, Grid } from "@mui/material";
import {
  pushRequest,
  getResponses,
  getEkyc,
  getBlockData,
} from "../helpers/database";
import { db } from "../fire";

function Update() {
  const [inputs, setInputs] = useState({
    aadhar: "",
  });

  const [user, setUser] = useState({});

  const [errors, setErrors] = useState({
    aadhar: "",
  });

  const handleInput = (prop) => (event) => {
    setInputs({ ...inputs, [prop]: event.target.value });
    validate(prop, event.target.value, errors, setErrors);
  };

  function handleRequest() {
    if (inputs.aadhar && user.uid) {
      pushRequest(inputs.aadhar, user.uid);
    }
  }

  const [requestResponses, setRequestResponses] = useState({});

  useEffect(async () => {
    const storage = await JSON.parse(localStorage.getItem("user"));
    setUser(await getEkyc(storage.uid));
    const res = await getResponses(storage.uid);
    if (Object.keys(res).length > 0) {
      const blockData = await getBlockData(res.blockHash, res.privateKey);
      setRequestResponses(blockData);
    }
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
        {Object.keys(requestResponses).length == 0 ? (
          <>
            <Typography component="h1" variant="h5">
              Enter the UID of Resident (House Owner)
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
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleRequest}
              >
                Request Aadhar
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography component="h1" variant="h5">
              Update your aadhar
            </Typography>

            <Box component="form" noValidate sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item sm={9}>
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Aadhar number"
                    name="aadhar"
                    disabled
                    value={user.uid}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Name"
                    name="name"
                    disabled
                    value={user.name}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Date of birth"
                    name="dob"
                    disabled
                    value={user.dob}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Gender"
                    name="gender"
                    disabled
                    value={user.gender}
                  />
                </Grid>
                <Grid item sm={3}>
                  <img src={`data:image/png;base64,${user.photo}`} />
                </Grid>
              </Grid>
              <TextField
                margin="normal"
                fullWidth
                label="Phone"
                name="phone"
                disabled
                value={user.phone}
              />
              <TextField
                margin="normal"
                fullWidth
                label="House"
                name="house"
                value={user.house}
              />
              <Grid container spacing={2}>
                <Grid item sm={6}>
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Landmark"
                    name="lm"
                    value={user.lm}
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Country"
                    name="country"
                    disabled
                    value={user.country}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item sm={6}>
                  <TextField
                    margin="normal"
                    fullWidth
                    label="State"
                    name="state"
                    value={user.state}
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    margin="normal"
                    fullWidth
                    label="PIN"
                    name="pin"
                    value={user.pc}
                  />
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}

export default Update;
