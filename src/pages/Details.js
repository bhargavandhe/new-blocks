import {
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { decrypt } from "../helpers/cipher";
import { getDataFromIPFS, getEkyc } from "../helpers/database";

function Details() {
  const [details, setDetails] = useState({
    uid: "",
    name: "",
    dob: "",
    gender: "",
    phone: "",
    photo: "",
    co: "",
    country: "",
    dist: "",
    house: "",
    lm: "",
    loc: "",
    pc: "",
    state: "",
    vtc: "",
  });

  async function fetch() {
    const data = JSON.parse(localStorage.getItem("user"));
    const ekyc = await getEkyc(data.uid);
    setDetails(ekyc);
    console.log(ekyc);
  }

  useEffect(() => {
    fetch();
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
          Your details
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
                value={details.uid}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Name"
                name="name"
                disabled
                value={details.name}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Date of birth"
                name="dob"
                disabled
                value={details.dob}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Gender"
                name="gender"
                disabled
                value={details.gender}
              />
            </Grid>
            <Grid item sm={3}>
              <img src={`data:image/png;base64,${details.photo}`} />
            </Grid>
          </Grid>
          <TextField
            margin="normal"
            fullWidth
            label="Phone"
            name="phone"
            disabled
            value={details.phone}
          />
          <TextField
            margin="normal"
            fullWidth
            label="House"
            name="house"
            disabled
            value={details.house}
          />
          <Grid container spacing={2}>
            <Grid item sm={6}>
              <TextField
                margin="normal"
                fullWidth
                label="Landmark"
                name="lm"
                disabled
                value={details.lm}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                margin="normal"
                fullWidth
                label="Country"
                name="country"
                disabled
                value={details.country}
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
                disabled
                value={details.state}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                margin="normal"
                fullWidth
                label="PIN"
                name="pin"
                disabled
                value={details.pc}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Details;
