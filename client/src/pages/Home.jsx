// import {
//   Avatar,
//   Box,
//   Container,
//   FormControl,
//   FormControlLabel,
//   Grid,
//   Typography,
// } from "@mui/material";
// import { Input, InputLabel, FormHelperText } from "@mui/material";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import React from "react";

// const Home = () => {
//   const updateSubmit = () => {};
//   return (
//     <>
//       <Container maxWidth="lg">
//         <Box sx={{ my: 4 }}>
//           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//             <AccountCircleIcon />
//           </Avatar>
//           <Typography variant="h3" component="h1" gutterBottom>
//             Welcome User
//           </Typography>
//           <FormControl>
//             <Grid container spacing={2} my={1}>
//               <Grid item xs={12} sm={6}>
//                 <InputLabel htmlFor="my-email">Email address</InputLabel>
//                 <Input id="my-email" aria-describedby="my-email-helper-text" />
//                 <FormHelperText id="my-email-helper-text">
//                   update your Email
//                 </FormHelperText>
//               </Grid>
//             </Grid>
//           </FormControl>
//         </Box>
//       </Container>
//        {/* name email readonly */}
//     </>
//   );
// };

// export default Home;
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid, Box, AppBar, Toolbar, IconButton } from '@mui/material';
import { Logout, Lock } from '@mui/icons-material';

const Home = () => {
  const handleLogout = () => {};

  return (
    <Container maxWidth="md">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Home
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ marginTop: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Welcome, John Doe
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Email: john.doe@example.com
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Current Password"
              type="password"
              variant="outlined"
              fullWidth
              
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="New Password"
              type="password"
              variant="outlined"
              fullWidth
              
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirm New Password"
              type="password"
              variant="outlined"
              fullWidth
              
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" startIcon={<Lock />}>
              Change Password
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
