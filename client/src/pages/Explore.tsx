import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import Navbar from "../components/Navbar";
import { Search, Table } from "../components";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { TSearch } from "../lib/types";
import { loadingAtom } from "../lib/store";
import { getSearch } from "../api/explore";

export default function Explore() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useAtom(loadingAtom);
  const [search, setSearch] = useState<TSearch>();
  const [listings, setListings] = useState<any[]>([]);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(location.search);
    const search = {
      location: params.get("location") || "",
      checkInDate: params.get("checkInDate"),
      checkOutDate: params.get("checkOutDate"),
      numGuests: +params.get("numGuests")! || 0,
      budget: params.get("budget"),
      filters: params.get("filters")?.split(","),
    };
    setSearch(search);
    const fetchData = async () => {
      const searchResponse = await getSearch(search!);
      if (searchResponse) {
        setListings(
          searchResponse.listings
            ? searchResponse.listings.map((listing) => Object.values(listing))
            : []
        );
        setRestaurants(
          searchResponse.restaurants
            ? searchResponse.restaurants.map((restaurant) =>
                Object.values(restaurant)
              )
            : []
        );
        setEvents(
          searchResponse.events
            ? searchResponse.events.map((event) => Object.values(event))
            : []
        );
      }
      setLoading(false);
    };
    fetchData();
  }, [location.search]);

  const handleSearch = (data: TSearch) => {
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
  const handleRestaurantClick = (id: string) => console.log(id);
  const handleListingClick = (id: string) => console.log(id);
  const handleEventClick = (id: string) => console.log(id);

  return (
    <>
      <Navbar />

      <Container maxWidth="lg">
        <Grid container spacing={2} sx={{ marginY: 4 }}>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Search {...search} onSearchSubmitCallback={handleSearch} />
              </CardContent>
            </Card>
          </Grid>
          {!loading && (
            <>
              <Grid item xs={12}>
                <Typography variant="h3">Restaurants</Typography>
                {restaurants.length ? (
                  <Table
                    action={handleRestaurantClick}
                    actionLabel="Add to Plan"
                    data={restaurants}
                    headers={["Name", "Location", "Price ($)"]}
                  ></Table>
                ) : (
                  <Typography textAlign="center" py={5} fontStyle="italic">
                    There are no restaurants that match your search.
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h3">Listings</Typography>
                {restaurants.length ? (
                  <Table
                    action={handleListingClick}
                    actionLabel="Add to Plan"
                    data={listings}
                    headers={["Name", "Location", "Price ($)"]}
                  ></Table>
                ) : (
                  <Typography textAlign="center" py={5} fontStyle="italic">
                    There are no listings that match your search.
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h3">Events</Typography>
                {restaurants.length ? (
                  <Table
                    action={handleEventClick}
                    data={events}
                    actionLabel="Add to Plan"
                    headers={["Name", "Location", "Price ($)"]}
                  ></Table>
                ) : (
                  <Typography textAlign="center" py={5} fontStyle="italic">
                    There are no events that match your search.
                  </Typography>
                )}
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </>
  );
}

// export default Explore;
