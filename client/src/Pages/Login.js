import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserId, setToken, setPicture } from "../Store/userSlice";
import { loginUser } from "../Services/api"; // import the loginUser function from the API module

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Login = () => {
  const [email, setEmail] = useState(""); // State to hold the email address
  const [password, setPassword] = useState(""); // State to hold the password
  const navigate = useNavigate(); // Navigate hook to redirect the user
  const dispatch = useDispatch(); // Dispatch hook to dispatch actions
  const user = useSelector((state) => state.user.user); // get user email from redux store to check if user already loggoed in or not
  const token = useSelector((state) => state.user.token); // get user token from redux store to check if user already loggoed in or not

    useEffect(() => {
    // If there is user data in the redux store, redirect to the dashboard
    if (user && token) {
      navigate("/");
    }
    }, [user, token]);


  // Function to handle login
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submit action

    try {
      // Call the loginUser function from the API module to send the login request
      const response = await loginUser({ email:email, password:password});
      console.log("Login response:", response);
      // Set the user in the redux store
      dispatch(setUser(response.email));
      // Set the token in the redux store
      dispatch(setToken(response.token));
      // Set the picture in the redux store
      dispatch(setPicture(response.picture));
      // Set the user id in the redux store
      dispatch(setUserId(response._id));
      // Redirect to the '/' path
      navigate("/");
    } catch (error) {
      console.log("Error logging in:", error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs" >
      <Box
        sx={{  
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent:"center"
        }}
      >
        <Typography component="h1" variant="h5" color={"black"}>
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
          
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    
  );
};

export default Login;
