import {
  Avatar,
  Box,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { Input, InputLabel, FormHelperText } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React from "react";

const Home = () => {
  const updateSubmit = () => {};
  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome User
          </Typography>
          <FormControl>
            <Grid container spacing={2} my={1}>
              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor="my-email">Email address</InputLabel>
                <Input id="my-email" aria-describedby="my-email-helper-text" />
                <FormHelperText id="my-email-helper-text">
                  update your Email
                </FormHelperText>
              </Grid>
            </Grid>
          </FormControl>
        </Box>
      </Container>
    </>
  );
};

export default Home;
