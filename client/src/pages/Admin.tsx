import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Navbar, Table } from "../components";
import { useEffect, useState } from "react";
import { getAdminMetrics } from "../api/auth";
import { useAtom } from "jotai";
import { loadingAtom } from "../lib/store";
import {
  BusinessTwoTone,
  Receipt,
  ReceiptLong,
  Stadium,
  PeopleAlt,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { listAllPlans } from "../api/plans";
import { TPlan } from "../lib/types";

export default function Admin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useAtom(loadingAtom);
  const [metrics, setMetrics] = useState<any>(null);
  const [tab, handleTabChange] = useState(0);
  const [plans, setPlans] = useState<TPlan[]>([]);
  const [listings, setListings] = useState<Object[]>([]);

  const handlePlanClick = (id: string) => navigate(`/plan/${id}`);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const metricsResponse = await getAdminMetrics();
      if (metricsResponse) setMetrics(metricsResponse);
      const plansReponse = await listAllPlans();
      if (plansReponse) setPlans(plansReponse);
      // const listingResponse = await listAllListings();
      // if (listingResponse)
      // setMetrics(listingResponse.map((item) => Object.values(item)));
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        {!loading && metrics && (
          <Grid container py={4} spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h2">Admin</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardHeader title="ALL USERS"></CardHeader>
                <CardContent
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography fontWeight="bold" variant={"h2"} color="primary">
                    {metrics.numUsers}
                  </Typography>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      backgroundColor: "transparent",
                    }}
                  >
                    <PeopleAlt sx={{ width: 80, height: 80 }} color="warning" />
                  </Avatar>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card title="Total Events">
                <CardHeader title="ALL PLANS"></CardHeader>
                <CardContent
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography fontWeight="bold" variant={"h2"} color="primary">
                    {metrics.numPlans}
                  </Typography>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      backgroundColor: "transparent",
                    }}
                  >
                    <Receipt sx={{ width: 80, height: 80 }} color="warning" />
                  </Avatar>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardHeader title="SHARED PLANS"></CardHeader>
                <CardContent
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography fontWeight="bold" variant={"h2"} color="primary">
                    {metrics.numPublicPlans}
                  </Typography>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      backgroundColor: "transparent",
                    }}
                  >
                    <ReceiptLong
                      sx={{ width: 80, height: 80 }}
                      color="warning"
                    />
                  </Avatar>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardHeader title="ALL ACTIVITIES"></CardHeader>
                <CardContent
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography fontWeight="bold" variant={"h2"} color="primary">
                    {metrics.numActivities}
                  </Typography>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      backgroundColor: "transparent",
                    }}
                  >
                    <Stadium sx={{ width: 80, height: 80 }} color="warning" />
                  </Avatar>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardHeader title="ALL LISTINGS"></CardHeader>
                <CardContent
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography fontWeight="bold" variant={"h2"} color="primary">
                    {metrics.numListings}
                  </Typography>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      backgroundColor: "transparent",
                    }}
                  >
                    <BusinessTwoTone
                      sx={{ width: 80, height: 80 }}
                      color="warning"
                    />
                  </Avatar>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Tabs
                value={tab}
                onChange={(_, newValue) => handleTabChange(newValue)}
                variant="fullWidth"
              >
                <Tab label="Plans" />
                <Tab label="Listings" />
              </Tabs>
              <Card variant="outlined" sx={{ my: 2 }}>
                <CardContent>
                  {tab === 0 ? (
                    plans.length ? (
                      <Table
                        action={handlePlanClick}
                        actionLabel="View"
                        data={plans.map((item) => [
                          item.location,
                          "$".repeat(item.budget),
                          item.stayName,
                        ])}
                        headers={["Location", "Budget", "Stay"]}
                      ></Table>
                    ) : (
                      <Typography textAlign="center" py={5} fontStyle="italic">
                        There are no public plans yet
                      </Typography>
                    )
                  ) : listings.length ? (
                    <Table
                      data={listings}
                      headers={["Name", "Location", "Price ($)"]}
                    ></Table>
                  ) : (
                    <Typography textAlign="center" py={5} fontStyle="italic">
                      There are no listings yet
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}
