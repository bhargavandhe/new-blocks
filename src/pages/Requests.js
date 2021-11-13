import {
  CheckBoxRounded,
  CheckCircleOutlineRounded,
  HighlightOffRounded,
} from "@mui/icons-material";
import {
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { db } from "../fire";
import { getDataFromFirebase, popRequest, sendKYC } from "../helpers/database";

function Requests() {
  const [user, setUser] = useState({ incomingRequests: {} });

  useEffect(() => {
    console.log("fetching");
    const data = JSON.parse(localStorage.getItem("user"));
    db.collection("users")
      .doc(data.uid)
      .get()
      .then((res) => {
        console.log(res.data());
        setUser(res.data());
      });
  }, []);

  function Request({ uid }) {
    const data = JSON.parse(localStorage.getItem("user"));

    function agree() {
      sendKYC(data.uid, uid);
    }

    function disagree() {
      console.log("pop", data.uid);
      popRequest(data.uid);
    }

    return (
      <Grid container>
        <Grid item sm={10}>
          <Typography>{uid}</Typography>
        </Grid>
        <Grid item sm={1}>
          <IconButton onClick={agree}>
            <CheckCircleOutlineRounded />
          </IconButton>
        </Grid>
        <Grid item sm={1}>
          <IconButton onClick={disagree}>
            <HighlightOffRounded />
          </IconButton>
        </Grid>
      </Grid>
    );
  }

  return (
    <Container>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Typography>Your requests</Typography>

        {user != {} &&
          Object.keys(user.incomingRequests).map((req) => {
            return <Request uid={req} />;
          })}
      </Stack>
    </Container>
  );
}

export default Requests;
