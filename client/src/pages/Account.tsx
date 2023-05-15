import React, { useEffect, useState } from "react";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles"; // Import ThemeProvider and createTheme from @mui/material/styles
import { Adb } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAtom } from "jotai";
import { userAtom } from "../lib/store";

function Account() {
  const [user, setUser] = useAtom(userAtom);
  const [isEditing, setIsEditing] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState(
    "https://example.com/profile-picture.jpg"
  );
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("khue.nguyen@gmail.com");
  const [password, setPassword] = useState("********");
  const theme = createTheme({
    // Create a custom theme with breakpoints defined
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (user) {
      setUsername(user.name!);
      setEmail(user.email!);
      setBio(
        `Hello, I am ${user.name}, an enthusiastic traveler! I am always on a mission to explore the next great adventure, whether it is hiking through remote wilderness or immersing myself in new cultures.`
      );
    }
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Save changes to server or update state as needed
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Card
          sx={{
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 4,
            }}
          >
            <Avatar
              src={profilePictureUrl}
              sx={{
                width: isSmallScreen ? 128 : 200,
                height: isSmallScreen ? 128 : 200,
              }}
            />
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: 4,
            }}
          >
            {isEditing ? (
              <div>
                <Typography variant="h5" gutterBottom>
                  Edit Profile
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Profile Picture URL:
                  </Typography>
                  <input
                    id="profile-picture-url"
                    type="text"
                    value={profilePictureUrl}
                    onChange={(e) => setProfilePictureUrl(e.target.value)}
                  />
                  <Typography variant="subtitle1" gutterBottom>
                    Username:
                  </Typography>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Typography variant="subtitle1" gutterBottom>
                    Bio:
                  </Typography>
                  <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                  <Typography variant="subtitle1" gutterBottom>
                    Email:
                  </Typography>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Typography variant="subtitle1" gutterBottom>
                    Password:
                  </Typography>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button variant="contained" onClick={handleSaveClick}>
                    Save
                  </Button>
                </Box>
              </div>
            ) : (
              <div>
                <Typography variant="h5" gutterBottom>
                  {username}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {bio}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Email: {email}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Password: {password.replace(/./g, "*")}
                </Typography>
                <Button variant="contained" onClick={handleEditClick}>
                  Edit
                </Button>
              </div>
            )}
          </Box>
        </Card>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            PLANS
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Adb fontSize="large" />
                  <Typography variant="h6" component="h3" gutterBottom>
                    My Created Plans
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Check out my most loved places!
                  </Typography>
                  <Link to="/listings/1">
                    <Button variant="contained">View Details</Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Adb fontSize="large" />
                  <Typography variant="h6" component="h3" gutterBottom>
                    My Saved Plans
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    I will explore these places in the next trip!
                  </Typography>
                  <Link to="/listings/2">
                    <Button variant="contained">View Details</Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Account;
