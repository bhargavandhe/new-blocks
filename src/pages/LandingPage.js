import { Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { useHistory } from "react-router";

function LandingPage() {
  const navigate = useHistory();
  function handleLogin() {
    navigate.push("/login");
  }

  function handleRegister() {
    navigate.push("/register");
  }

  return (
    <Container>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Typography>Login or Register to continue</Typography>
        <Button margin="normal" variant="outlined" onClick={handleLogin}>
          Login
        </Button>
        <Button margin="normal" variant="outlined" onClick={handleRegister}>
          Register
        </Button>
      </Stack>
    </Container>
  );
}

export default LandingPage;
