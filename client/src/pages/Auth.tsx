import TextField from "@mui/material/TextField";
import {
  Avatar,
  Box,
  Button,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IAuthForm } from "../lib/types";
import { useEffect, useState } from "react";
import { login, register } from "../api/auth";
import { userAtom } from "../lib/store";
import { useAtom } from "jotai";

interface AuthProps {
  type: "login" | "signup";
}

const Login: React.FC<AuthProps> = ({ type }: AuthProps) => {
  const navigate = useNavigate();
  const [_, setUser] = useAtom(userAtom);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowCPassword = () => setShowCPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const { control, handleSubmit, reset } = useForm<IAuthForm>({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      cpassword: "",
    },
  });

  useEffect(
    () =>
      reset({
        fullname: "",
        email: "",
        password: "",
        cpassword: "",
      }),
    [type]
  );

  const linkButtonText: string =
    type === "login" ? "New User? Click here." : "Existing User? Click here";
  const linkButtonURL: string =
    type === "login" ? "/auth/signup" : "/auth/login";

  const onSubmit: SubmitHandler<IAuthForm> = async (data) => {
    console.log(data);
    let response;
    if (type === "login") {
      response = await login({
        email: data.email,
        password: data.password,
      });
    } else {
      if (data.fullname) {
        response = await register({
          fullname: data.fullname,
          email: data.email,
          password: data.password,
        });
      }
    }
    if (response) {
      setUser({ isLoggedIn: true, ...data });
      navigate("/dashboard");
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <Grid container sx={{ minHeight: "100vh" }} component="main">
        <Grid
          item
          xs={12}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url('/src/assets/login.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "30vh",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          paddingX={5}
          paddingY={10}
          elevation={6}
          square
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              {type === "login" ? "Sign In" : "Register"}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              {type === "signup" && (
                <Controller
                  name="fullname"
                  control={control}
                  rules={{ required: "Full Name is required" }}
                  render={({ field, formState: { errors } }) => (
                    <TextField
                      error={errors.fullname !== undefined}
                      helperText={errors.fullname?.message}
                      {...field}
                      type="text"
                      label="Name"
                      fullWidth
                      margin="normal"
                      autoComplete="name"
                      autoFocus
                    />
                  )}
                />
              )}
              <Controller
                name="email"
                control={control}
                rules={{ required: "Email is required" }}
                render={({ field, formState: { errors } }) => (
                  <TextField
                    {...field}
                    error={errors.email !== undefined}
                    helperText={errors.email?.message}
                    label="Email"
                    fullWidth
                    type="email"
                    margin="normal"
                    autoComplete="email"
                    autoFocus
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required" }}
                render={({ field, formState: { errors } }) => (
                  <TextField
                    {...field}
                    label="Password"
                    error={errors.password !== undefined}
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    helperText={errors.password?.message}
                    margin="normal"
                    autoComplete="current-password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              {type === "signup" && (
                <Controller
                  name="cpassword"
                  control={control}
                  rules={{ required: "Need to confirm password" }}
                  render={({ field, formState: { errors } }) => {
                    return (
                      <TextField
                        {...field}
                        error={errors.cpassword !== undefined}
                        label="Confirm Password"
                        fullWidth
                        helperText={errors.cpassword?.message}
                        type={showCPassword ? "text" : "password"}
                        margin="normal"
                        autoComplete="current-password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowCPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showCPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    );
                  }}
                />
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {type === "login" ? "Sign In" : "Register"}
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <RouterLink
                    to={type === "login" ? "/auth/signup" : "/auth/login"}
                  >
                    <MuiLink component="span" underline="hover" variant="body2">
                      {type === "login"
                        ? "Don't have an account? Sign Up"
                        : "Already have an account? Sign In"}
                    </MuiLink>
                  </RouterLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
