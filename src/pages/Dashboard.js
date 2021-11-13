import { Button, Container, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getDataFromFirebase } from "../helpers/database";

function Dashboard() {
  const history = useHistory();
  const [user, setUser] = useState({});

  useEffect(async () => {
    const data = JSON.parse(localStorage.getItem("user"));
    setUser(data);
    // getDataFromFirebase(data.uid).then((data) => console.log(data));
  }, []);

  function handleLogout() {
    localStorage.setItem("user", null);
    history.push("/login");
  }

  function showDetails() {
    history.push("/details");
  }

  function update() {
    history.push("/update");
  }

  function showRequests() {
    history.push("/requests");
  }

  return (
    <Container>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Typography>Welcome {user?.uid}</Typography>
        <Button margin="normal" variant="outlined" onClick={showDetails}>
          My Aadhar
        </Button>
        <Button variant="outlined" onClick={update}>
          Update Aadhar
        </Button>
        <Button variant="outlined" onClick={showRequests}>
          Requests
        </Button>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Stack>
    </Container>
  );
}

export default Dashboard;
