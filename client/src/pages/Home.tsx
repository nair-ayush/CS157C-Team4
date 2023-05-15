import { useTheme } from "@emotion/react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { TrendingUp } from "@mui/icons-material";
import DisplayCard from "../components/DisplayCard";
import { CustomTheme } from "../lib/theme";
import { Search } from "../components";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { loadingAtom } from "../lib/store";
import { getTrendingPlans } from "../api/plans";
import { TActivity, TListing, TPlan, TSearch } from "../lib/types";
import { getTrendingListings } from "../api/listings";
import { getTrendingActivities } from "../api/activities";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useAtom(loadingAtom);
  const theme: CustomTheme = useTheme() as CustomTheme;
  const [trendingActivities, setTrendingActivities] = useState<TActivity[]>([]);
  const [trendingListings, setTrendingListings] = useState<TListing[]>([]);
  const [trendingPlans, setTrendingPlans] = useState<TPlan[]>([]);
  const belowMdMatches = useMediaQuery(theme.breakpoints.down("md"));
  // const belowSmMatches = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const [plansResponse, listingsResponse, activitiesResponse] =
        await Promise.all([
          getTrendingPlans(),
          getTrendingListings(),
          getTrendingActivities(),
        ]);
      setTrendingPlans(plansResponse);
      setTrendingListings(listingsResponse);
      setTrendingActivities(activitiesResponse);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSubmit = (data: TSearch) => {
    console.log(data);
    const params = new URLSearchParams();
    params.set("location", data.location || "");
    params.set("checkInDate", data.checkInDate?.toString() || "");
    params.set("checkOutDate", data.checkOutDate?.toString() || "");
    params.set("numGuests", `${data.numGuests}`);
    params.set("budget", `${data.budget}`);
    params.set("filters", data.filters?.join(",") || "");
    navigate(`/explore?${params.toString()}`);
  };

  return (
    <>
      <Navbar />
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
            <Search onSearchSubmitCallback={handleSubmit} />
          </CardContent>
        </Card>
        <Typography variant={belowMdMatches ? "h5" : "h3"} color="lightgrey">
          <q>Create a plan for your trip today and travel tension-free!</q>
        </Typography>
      </Box>
      <Container maxWidth="xl" sx={{ my: 2, flex: "1 1 auto" }}>
        {!loading && (
          <Box>
            <Box pt={2} display={"flex"} alignItems={"center"}>
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
                    <DisplayCard
                      label={plan.name}
                      imageURL={plan.imageURL}
                      navigateTo={`/plan/${encodeURIComponent(plan.id)}`}
                    />
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
                Stays
              </Typography>
              <Typography variant="subtitle2">See More</Typography>
            </Box>
            <Grid container spacing={2} pt={2}>
              {trendingListings.map((listing, key) => {
                return (
                  <Grid item lg={2} md={4} xs={6} key={key}>
                    <DisplayCard
                      imageURL={listing.imageURL}
                      label={listing.name}
                      navigateTo={`/stay/${encodeURIComponent(listing.id)}`}
                    />
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
                Activities
              </Typography>
              <Typography variant="subtitle2">See More</Typography>
            </Box>
            <Grid container spacing={2} pt={2}>
              {trendingActivities.map((activity, key) => {
                return (
                  <Grid item lg={2} md={4} xs={6} key={key}>
                    <DisplayCard
                      imageURL={activity.imageURL}
                      label={activity.name}
                      navigateTo={`/activity/${encodeURIComponent(
                        activity.id
                      )}`}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}
      </Container>
    </>
  );
};

export default Home;
