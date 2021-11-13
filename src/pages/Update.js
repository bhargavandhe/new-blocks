/* eslint-disable react-hooks/exhaustive-deps */
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
  getDataFromFirebase,
  addToIPFS,
  updateKYC,
  getRawEkyc,
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

  const [data, setData] = useState({
    uid: "",
    name: "",
    dob: "",
    gender: "",
    phone: "",
    house: "",
    landmark: "",
    country: "",
    state: "",
    pc: "",
    photo: "",
  });

  const [requestResponses, setRequestResponses] = useState({});

  useEffect(async () => {
    const storage = await JSON.parse(localStorage.getItem("user"));
    const data1 = await getEkyc(storage.uid);
    setUser(data1);
    const res = await getResponses(storage.uid);
    if (res && Object.keys(res).length > 0) {
      const blockData = await getBlockData(res.blockHash, res.privateKey);
      setRequestResponses(blockData);
      console.log(data1, blockData);

      setData({
        uid: data1.uid,
        name: data1.name,
        dob: data1.dob,
        gender: data1.gender,
        phone: data1.phone,
        photo: data1.photo,
        house: blockData.house,
        landmark: blockData.lm,
        country: blockData.country,
        state: blockData.state,
        pc: blockData.pc,
      });
    }
  }, []);

  async function update() {
    const res = await getDataFromFirebase(data.uid);
    const privateKey = res.privateKey;

    const rawEkyc = await getRawEkyc(data.uid);

    rawEkyc.KycRes.UidData.Poa._attributes.house = data.house;
    rawEkyc.KycRes.UidData.Poa._attributes.lm = data.landmark;
    rawEkyc.KycRes.UidData.Poa._attributes.state = data.state;
    rawEkyc.KycRes.UidData.Poa._attributes.pc = data.pc;

    // user.house = data.house;
    // user.lm = data.landmark;
    // user.state = data.state;
    // user.pin = data.pin;

    updateKYC(rawEkyc, privateKey);
  }

  const handleInput1 = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };

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
                    value={data.uid}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Name"
                    name="name"
                    disabled
                    value={data.name}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Date of birth"
                    name="dob"
                    disabled
                    value={data.dob}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Gender"
                    name="gender"
                    disabled
                    value={data.gender}
                  />
                </Grid>
                <Grid item sm={3}>
                  <img src={`data:image/png;base64,${data.photo}`} />
                </Grid>
              </Grid>
              <TextField
                margin="normal"
                fullWidth
                label="Phone"
                name="phone"
                disabled
                value={data.phone}
                onChange={handleInput1("phone")}
              />
              <TextField
                margin="normal"
                fullWidth
                label="House"
                name="house"
                value={data.house}
                onChange={handleInput1("house")}
              />
              <Grid container spacing={2}>
                <Grid item sm={6}>
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Landmark"
                    name="lm"
                    value={data.landmark}
                    onChange={handleInput1("landmark")}
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Country"
                    name="country"
                    disabled
                    value={data.country}
                    onChange={handleInput1("country")}
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
                    value={data.state}
                    onChange={handleInput1("state")}
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    margin="normal"
                    fullWidth
                    label="PIN"
                    name="pin"
                    value={data.pc}
                    onChange={handleInput1("pc")}
                  />
                </Grid>
              </Grid>
            </Box>
          </>
        )}
        <Button
          variant="contained"
          onClick={() => {
            update();
          }}
        >
          Update
        </Button>
      </Box>
    </Container>
  );
}

export default Update;
