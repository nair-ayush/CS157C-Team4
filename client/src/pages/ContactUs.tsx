import { useTheme } from "@emotion/react";
import { Adb } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import theme, { CustomTheme } from "../theme";

const ContactUs = () => {
  const theme: CustomTheme = useTheme() as CustomTheme;
  const belowMdMatches = useMediaQuery(theme.breakpoints.down("md"));
  const imgDim = belowMdMatches ? 150 : 300;
  return (
    <>
      <Navbar />
      <Box
        sx={{
          backgroundColor:
            theme.palette.mode === "light"
              ? theme.palette.primary.main
              : theme.palette.background.default,

          color: theme.palette.mode === "light" ? "white" : undefined,
        }}
        p={3}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={1}
      >
        <Typography
          variant={belowMdMatches ? "h4" : "h2"}
          sx={{ fontStyle: "italic", textAlign: "center", my: 5 }}
        >
          New in Explore Mate
        </Typography>
        <Grid container spacing={2} maxWidth="xl" my={5}>
          <Grid
            item
            xs={12}
            sm={6}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Adb sx={{ fontSize: belowMdMatches ? 100 : 200 }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>
              Create experiences faster with new features in Explore Mate.
              Create, edit and publish plans for future use and share with
              friends. Make standout experiences quickly. And design for the
              future with Google Maps and Places API.
            </Typography>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                sx={{ borderColor: "white", color: "white", m: 2 }}
              >
                Explore the app
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Container maxWidth="xl" sx={{ my: 2, flex: "1 1 auto" }}>
        <Typography
          variant={belowMdMatches ? "h5" : "h3"}
          sx={{ fontStyle: "italic", fontWeight: "light" }}
        >
          Meet the Team
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  alt="Khue Do Anh Nguyen"
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                  sx={{ width: imgDim, height: imgDim }}
                />
                <Typography
                  variant={belowMdMatches ? "h5" : "h4"}
                  color="secondary"
                >
                  Khue Do Anh Nguyen
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  alt="Ayush Nair"
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                  sx={{ width: imgDim, height: imgDim }}
                />
                <Typography
                  variant={belowMdMatches ? "h5" : "h4"}
                  color="secondary"
                >
                  Ayush Nair
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  alt="Chinmayi Lokeshwar Hegde"
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                  sx={{ width: imgDim, height: imgDim }}
                />
                <Typography
                  variant={belowMdMatches ? "h5" : "h4"}
                  color="secondary"
                >
                  Chinmayi Lokeshwar Hegde
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Typography variant="h6" sx={{ textAlign: "center", py: 2 }}>
          Please reach out to us for any new features or issues.
        </Typography>
      </Container>
    </>
  );
};

export default ContactUs;
