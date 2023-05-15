import "./style.css";
import Navbar from "../components/Navbar";
import {
  Card,
  Box,
  CardContent,
  Grid,
  Typography,
  CardHeader,
  CardMedia,
  Chip,
  CardActionArea,
  Button,
  Stack,
  CardActions,
  Container,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { loadingAtom, userAtom } from "../lib/store";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { TPlan } from "../lib/types";
import { getPlansByUser, getSavedPlansByUser } from "../api/plans";
import { CalendarMonth, LocationOn, People } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { convertToUserShortDate } from "../lib/util";
import { CustomTheme } from "../lib/theme";

function Dashboard() {
  const [user] = useAtom(userAtom);
  const [userPlans, setUserPlans] = useState<TPlan[]>([]);
  const [savedPlans, setSavedPlans] = useState<TPlan[]>([]);
  const [loading, setLoading] = useAtom(loadingAtom);
  const belowSmMatches = useMediaQuery((theme: CustomTheme) =>
    theme.breakpoints.down("sm")
  );

  useEffect(() => {
    setLoading(true);
    const fetchData = async (id: string) => {
      const [userPlansResponse, savedPlansResponse] = await Promise.all([
        getPlansByUser(id),
        getSavedPlansByUser(id),
      ]);
      setUserPlans(userPlansResponse ?? []);
      setSavedPlans(savedPlansResponse ?? []);
      setLoading(false);
    };
    if (user.id) fetchData(user.id);
  }, [user]);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Box
          pt={5}
          display="flex"
          flexDirection={belowSmMatches ? "column" : "row"}
          gap={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant={belowSmMatches ? "h4" : "h2"} fontStyle="italic">
            Welcome, {user.name}
          </Typography>
          <Link
            to="/plan/new"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography variant="h6" color="secondary">
              Create a new plan?
            </Typography>
          </Link>
        </Box>
        <Divider sx={{ m: 2 }} />
        <Typography variant="h4">Your plans</Typography>
        <Grid container spacing={2} py={4}>
          {userPlans.map((plan) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={plan.id}>
                <Card className="card">
                  <CardHeader
                    title={<Typography variant="h5">{plan.name}</Typography>}
                    action={
                      <Link to={`/plan/${plan.id}`}>
                        <button className="button">
                          <span className="button-content">View Plan</span>
                        </button>
                      </Link>
                    }
                  />
                  <CardMedia
                    component="img"
                    // width={70}
                    height={150}
                    image={plan.imageURL}
                    alt="Paella dish"
                  />
                  <CardContent className="card-details" sx={{ py: 4 }}>
                    <Stack direction="row" flexWrap={"wrap"} gap={2}>
                      {/* <Chip
                        size="small"
                        color="primary"
                        icon={<LocationOn />}
                        label={plan.location}
                      /> */}
                      <Chip
                        size="small"
                        color="secondary"
                        icon={<CalendarMonth />}
                        label={`Start: ${convertToUserShortDate(
                          plan.startDate
                        )}`}
                      />
                      <Chip
                        size="small"
                        color="error"
                        icon={<CalendarMonth />}
                        label={`End: ${convertToUserShortDate(plan.endDate)}`}
                      />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Typography variant="h4">Saved plans</Typography>
        <Grid container spacing={3} py={4}>
          {savedPlans.map((plan) => (
            <Grid key={plan.id} item xs={12} sm={6} md={4}>
              <Card className="card">
                <CardHeader
                  title={<Typography variant="h5">{plan.name}</Typography>}
                  action={
                    <Link to={`/plan/${plan.id}`}>
                      <button className="button">
                        <span className="button-content">View Plan</span>
                      </button>
                    </Link>
                  }
                />
                <CardMedia
                  component="img"
                  // width={70}
                  height={150}
                  image={plan.imageURL}
                  alt="Paella dish"
                />
                <CardContent className="card-details" sx={{ py: 4 }}>
                  <Stack direction="row" flexWrap={"wrap"} gap={2}>
                    {/* <Chip
                      size="small"
                      color="primary"
                      icon={<LocationOn />}
                      label={plan.location}
                    /> */}
                    <Chip
                      size="small"
                      color="secondary"
                      icon={<CalendarMonth />}
                      label={`Start: ${convertToUserShortDate(plan.startDate)}`}
                    />
                    <Chip
                      size="small"
                      color="error"
                      icon={<CalendarMonth />}
                      label={`End: ${convertToUserShortDate(plan.endDate)}`}
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Dashboard;
