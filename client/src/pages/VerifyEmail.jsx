import api from "../config/api";
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const VerifyEmail = () => {

  const params = useParams();
  const tokenVerify = async () =>{
    const res = await  api.post("/auth/verify-email", { token: params.token });
    // console.log(res.data);
    if(res.data.success){
      toast.success(res.data.msg, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
      setTimeout(() => {
        window.close();
      }, 3000);

    }else{
      toast.error(res.data.msg, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
      }
      setTimeout(() => {
        window.close();
      }
      , 3000);
  }
  useEffect(() =>{
    tokenVerify();

  })
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "16px",
      }}
    >
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Link
            to="/SignIn"
            component={Button}
            variant="contained"
            color="primary"
            sx={{
              marginTop: "16px",
            }}
          >
            Go to SignIn Page
          </Link>
        </Grid>
        <Grid item>
          <ToastContainer />
        </Grid>
      </Grid>
    </div>
  );
}

export default VerifyEmail;