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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const Home = () => {
  const [name, setName] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const updateSubmit = async (data) => {
    console.log(data);
    if (data.password === data.cpassword) {
      const updateUser = {
        email: name.email,
        password: data.password,
        cupassword: data.cupassword,
      };
      api
        .post("/auth/update", { updateUser })
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
            });
            localStorage.removeItem("data");
            setTimeout(() => {
              window.location.href = "/";
            }, 3500);
          } else {
            toast.error(res.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Passwords doesn't match", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("data");
    navigate("/");
  };
  const loadData = async () => {
    try {
      const token = await JSON.parse(localStorage.getItem("data"));
      // console.log(token);
      const res = await api.get("/auth/userdata", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res.data)
      if (res.data.success) {
        setName(res.data.data);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
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
              Welcome,
              {name?.user}
              {/* {name} */}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Email:
              {name?.email}
              {/* {email} */}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(updateSubmit)}
            >
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    label="Name"
                    // InputLabelProps={
                    //   {shrink: "true"}
                    // }
                    autoComplete="name"
                    type="text"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                    // value={name}
                    value={name?.user}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Email"
                    // InputLabelProps={
                    //   {shrink: true}
                    // }
                    type="email"
                    autoComplete="email"
                    variant="outlined"
                    fullWidth
                    // value={email}
                    InputProps={{
                      readOnly: true,
                    }}
                    value={name?.email}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Current Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    autoComplete="current-password"
                    {...register("cupassword", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character",
                      },
                    })}
                    error={!!errors.cupassword}
                    helperText={errors?.cupassword?.message}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="New Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    autoComplete="new-password"
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character",
                      },
                    })}
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Confirm New Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    autoComplete="confirm-password"
                    {...register("cpassword", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character",
                      },
                    })}
                    error={!!errors.cpassword}
                    helperText={errors?.cpassword?.message}
                  />
                </Grid>
                <Grid item sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    startIcon={<Lock />}
                    type="submit"
                  >
                    Change Password
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <DevTool control={control} />
          </Grid>
        </Grid>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default Home;

