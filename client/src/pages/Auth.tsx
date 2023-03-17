import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import { CardActions, CardContent } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useTheme } from "@emotion/react";
import { CustomTheme } from "../theme";
import { login, IAuthForm, register } from "../api/auth";
import { AuthContext, IUser } from "../App";

interface AuthProps {
  type: "login" | "signup";
}

const Login: React.FC<AuthProps> = ({ type }: AuthProps) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [cpassword, setCPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const theme: CustomTheme = useTheme() as CustomTheme;
  const navigate = useNavigate();
  const { updateUser } = useContext(AuthContext);

  const linkButtonText: string =
    type === "login" ? "New User? Click here." : "Existing User? Click here";
  const linkButtonURL: string =
    type === "login" ? "/auth/signup" : "/auth/login";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // handle login logic here
    let body: IAuthForm = { username: email, password };
    if (type === "signup") {
      body = { ...body, name };
    }
    try {
      const res: IUser =
        type === "login" ? await login(body) : await register(body);
      updateUser(res);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <Container
        maxWidth="xs"
        sx={{
          my: 2,
          flex: "1 1 auto",
          pt: 5,
        }}
      >
        <Card variant="outlined" sx={{ my: 5 }}>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: theme.spacing(3),
              }}
            >
              {type === "signup" && (
                <TextField
                  label="Name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              )}
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              {type === "signup" && (
                <TextField
                  label="Confirm Password"
                  type="password"
                  value={cpassword}
                  onChange={(event) => setCPassword(event.target.value)}
                />
              )}
              <Button variant="contained" color="primary" type="submit">
                {type === "login" ? "Login" : "Sign Up"}
              </Button>
            </form>
          </CardContent>
          <CardActions
            sx={{
              justifyContent: type === "login" ? "space-between" : "flex-end",
            }}
          >
            {type === "login" && (
              <Button size="small" variant="text">
                Forgot Password?
              </Button>
            )}
            <Link to={linkButtonURL} style={{ textDecoration: "none" }}>
              <Button size="small" variant="text">
                {linkButtonText}
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Container>
    </>
  );
};

export default Login;
