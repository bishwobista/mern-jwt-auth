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
import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import { Logout, Lock } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../config/api";

const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("data");
    navigate("/");
  };

  const loadData = async () => {
    
      const token = await JSON.parse(localStorage.getItem("data"));
      const res = await api.get("/auth/userdata", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setName(res.data.data);
        setEmail(res.data.data);
      } else {
        useEffect(() => {
          navigate("/");
        });
      }
    
  };

  useEffect(() => {
    loadData();
  }, []);

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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Welcome, {name?.user}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Email: {name?.email}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box component="form" noValidate>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    label="Current Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="New Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Confirm New Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item sx={{ textAlign: "center" }}>
                  <Button variant="contained" startIcon={<Lock />}>
                    Change Password
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
