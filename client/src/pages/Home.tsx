import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Chip,
  Grid,
  InputAdornment,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Container from "@mui/material/Container";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Moment } from "moment";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Place, SearchOutlined, TrendingUp } from "@mui/icons-material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import DisplayCard from "../components/DisplayCard";
import { CustomTheme } from "../theme";
import { listAllUsers } from "../api/usersApi";

const eventFilters = [
  "Theme Parks",
  "Restaurants",
  "Sports",
  "Concerts",
  "Museums",
  "Arcades",
  "Bars",
];
const trendingLocations = [
  {
    label: "San Francisco",
    navigateTo: "/",
    imageURL:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2144&q=80",
  },
  {
    label: "Los Angeles",
    navigateTo: "/",
    imageURL:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
  {
    label: "New York",
    navigateTo: "/",
    imageURL:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80",
  },
  {
    label: "Austin",
    navigateTo: "/",
    imageURL:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
  {
    label: "Napa Valley",
    navigateTo: "/",
    imageURL:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2144&q=80",
  },
  {
    label: "Las Vegas",
    navigateTo: "/",
    imageURL:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80",
  },
];
const trendingPlans = [
  {
    label: "San Francisco",
    navigateTo: "/",
    budget: 1,
    numDays: 1,
    imageURL:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2144&q=80",
  },
  {
    label: "Los Angeles",
    navigateTo: "/",
    budget: 3,
    numDays: 3,
    imageURL:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
  {
    label: "New York",
    navigateTo: "/",
    budget: 1,
    numDays: 5,
    imageURL:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80",
  },
  {
    label: "Austin",
    navigateTo: "/",
    budget: 2,
    numDays: 3,
    imageURL:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
  {
    label: "Napa Valley",
    navigateTo: "/",
    budget: 2,
    numDays: 2,
    imageURL:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2144&q=80",
  },
  {
    label: "Las Vegas",
    navigateTo: "/",
    budget: 1,
    numDays: 3,
    imageURL:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80",
  },
];

const Home = () => {
  const theme: CustomTheme = useTheme() as CustomTheme;
  const [location, setLocation] = useState<string>("");
  const [budgetLevel, setBudgetLevel] = useState<string>("");
  const [checkInDate, setCheckInDate] = useState<Moment | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Moment | null>(null);
  const [numGuests, setNumGuests] = useState<number>(1);
  const [events, setEvents] = useState<string[]>([]);
  const belowMdMatches = useMediaQuery(theme.breakpoints.down("md"));
  const belowSmMatches = useMediaQuery(theme.breakpoints.down("sm"));

  const initFetchUsers = async () => {
    const users = await listAllUsers();
    console.log(users);
  };

  useEffect(() => {
    initFetchUsers();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // handle login logic here
  };

  const DatePicker = belowSmMatches ? MobileDatePicker : DesktopDatePicker;

  const handleBudget = (_: React.MouseEvent<HTMLElement>, newBudget: string) =>
    setBudgetLevel(newBudget);

  return (
    <>
      <Navbar></Navbar>
      <Box
        sx={{
          backgroundColor:
            theme.palette.mode === "light"
              ? theme.palette.primary.main
              : theme.palette.background.default,
          fontStyle: "italic",
          textAlign: "center",
          color: theme.palette.mode === "light" ? "white" : undefined,
        }}
        p={3}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={1}
      >
        <Typography variant={belowMdMatches ? "h4" : "h2"}>
          Designing Experiences for <strong>everyone</strong>!
        </Typography>
        <Card variant="outlined">
          <CardContent>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={6}
                    lg={2}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      label="Where"
                      type="text"
                      size={belowMdMatches ? "small" : undefined}
                      value={location}
                      fullWidth
                      onChange={(event) => setLocation(event.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Place />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    lg={2}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      label="Guests"
                      size={belowMdMatches ? "small" : undefined}
                      type="number"
                      value={numGuests}
                      fullWidth
                      onChange={(event) => setNumGuests(+event.target.value)}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    lg={2}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <DatePicker
                      label="Check In"
                      inputFormat="MM/DD/YYYY"
                      value={checkInDate}
                      onChange={setCheckInDate}
                      renderInput={(params) => (
                        <TextField
                          size={belowMdMatches ? "small" : undefined}
                          fullWidth
                          {...params}
                        />
                      )}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    lg={2}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <DatePicker
                      label="Check Out"
                      inputFormat="MM/DD/YYYY"
                      value={checkOutDate}
                      onChange={setCheckOutDate}
                      renderInput={(params) => (
                        <TextField
                          size={belowMdMatches ? "small" : undefined}
                          fullWidth
                          {...params}
                        />
                      )}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    lg={2}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: theme.spacing(1),
                      }}
                    >
                      <Typography>Budget</Typography>
                      <ToggleButtonGroup
                        value={budgetLevel}
                        exclusive
                        color="primary"
                        size={belowMdMatches ? "small" : undefined}
                        onChange={handleBudget}
                        aria-label="text alignment"
                      >
                        <ToggleButton
                          value="1"
                          sx={{
                            minWidth: 0,
                            maxWidth: "none",
                            width: "100%",
                            px: 1,
                          }}
                        >
                          $
                        </ToggleButton>
                        <ToggleButton
                          value="2"
                          sx={{
                            minWidth: 0,
                            maxWidth: "none",
                            width: "100%",
                            px: 1,
                          }}
                        >
                          $$
                        </ToggleButton>
                        <ToggleButton
                          value="3"
                          sx={{
                            minWidth: 0,
                            maxWidth: "none",
                            width: "100%",
                            px: 1,
                          }}
                        >
                          $$$
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    lg={2}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={<SearchOutlined />}
                    >
                      Search
                    </Button>
                  </Grid>
                </Grid>
              </LocalizationProvider>
            </form>
            <Box
              mt={2}
              display={"flex"}
              justifyContent={"center"}
              gap={1}
              flexDirection={belowMdMatches ? "column" : "row"}
              alignItems={"center"}
            >
              <Typography sx={{ fontStyle: "italic", fontWeight: "light" }}>
                Select events that you prefer
              </Typography>
              <Box
                gap={1}
                display={"flex"}
                flexWrap={"wrap"}
                justifyContent={"center"}
              >
                {eventFilters.map((event, key) => {
                  return (
                    <Chip
                      label={event}
                      color={events.includes(event) ? "secondary" : "default"}
                      key={key}
                      variant="outlined"
                      onClick={() => {
                        if (events.includes(event))
                          setEvents((events) =>
                            events.filter((e) => e !== event)
                          );
                        else setEvents([...events, event]);
                      }}
                    />
                  );
                })}
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Typography variant={belowMdMatches ? "h5" : "h3"} color="lightgrey">
          <q>Create a plan for your trip today and travel tension-free!</q>
        </Typography>
      </Box>
      <Container maxWidth="xl" sx={{ my: 2, flex: "1 1 auto" }}>
        <Box>
          <Box
            pt={2}
            display={"flex"}
            // justifyContent={"space-between"}
            alignItems={"center"}
          >
            <TrendingUp color="secondary" />
            <Typography
              variant="h5"
              sx={{ fontStyle: "italic" }}
              color="secondary"
            >
              Trending
            </Typography>
          </Box>
          <Box
            pt={2}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              variant="h6"
              sx={{ fontStyle: "italic" }}
              color="secondary"
            >
              Plans
            </Typography>
            <Typography variant="subtitle2">See More</Typography>
          </Box>
          <Grid container spacing={2} pt={2}>
            {trendingPlans.map((plan, key) => {
              return (
                <Grid item lg={2} md={4} xs={6} key={key}>
                  <DisplayCard {...plan} />
                </Grid>
              );
            })}
          </Grid>
          <Box
            pt={2}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              variant="h6"
              sx={{ fontStyle: "italic" }}
              color="secondary"
            >
              Locations
            </Typography>
            <Typography variant="subtitle2">See More</Typography>
          </Box>
          <Grid container spacing={2} pt={2}>
            {trendingLocations.map((loc, key) => {
              return (
                <Grid item lg={2} md={4} xs={6} key={key}>
                  <DisplayCard {...loc} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Home;
