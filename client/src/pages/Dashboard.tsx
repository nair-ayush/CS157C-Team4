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
} from "@mui/material";
import { loadingAtom, userAtom } from "../lib/store";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { TPlan } from "../lib/types";
import { getPlansByUser } from "../api/plans";
import { CalendarMonth, LocationOn, People } from "@mui/icons-material";
import { Link } from "react-router-dom";

function Dashboard() {
  const [user] = useAtom(userAtom);
  const [userPlans, setUserPlans] = useState<TPlan[]>([]);
  const [savedPlans, setSavedPlans] = useState<TPlan[]>([]);
  const [loading, setLoading] = useAtom(loadingAtom);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await getPlansByUser(+user.id!);
      if (response) {
        setUserPlans(response.userPlans ?? []);
        setSavedPlans(response.savedPlans ?? []);
      }
      setLoading(false);
    };
    fetchData();
  }, [user]);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Box
          pt={5}
          display="flex"
          gap={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h2" fontStyle="italic">
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
        <Divider />
        <Typography variant="h4">Your plans</Typography>
        <Grid container spacing={6} py={4}>
          {userPlans.map((plan) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={plan.id}>
                <Card className="card">
                  <CardHeader
                    title={
                      <Typography variant="h5">{plan.location}</Typography>
                    }
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
                      <Chip
                        size="small"
                        icon={<People />}
                        color="warning"
                        label={`Saved By:  ${6}`}
                      />
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
                        label={`Start: ${plan.startDate}`}
                      />
                      <Chip
                        size="small"
                        color="error"
                        icon={<CalendarMonth />}
                        label={`End: ${plan.endDate}`}
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
                  title={<Typography variant="h5">{plan.location}</Typography>}
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
                    <Chip
                      size="small"
                      icon={<People />}
                      color="warning"
                      label={`Saved By:  ${6}`}
                    />
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
                      label={`Start: ${plan.startDate}`}
                    />
                    <Chip
                      size="small"
                      color="error"
                      icon={<CalendarMonth />}
                      label={`End: ${plan.endDate}`}
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
