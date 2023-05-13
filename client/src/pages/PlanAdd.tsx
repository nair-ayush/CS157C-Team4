import { Container, Divider, Grid, Typography } from "@mui/material";
import { Navbar } from "../components";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TPlanForm } from "../lib/types";
import PlanForm from "../components/PlanForm";

export default function PlanAdd() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [plan, setPlan] = useState<TPlanForm>();

  useEffect(() => {
    const params = new URLSearchParams(search);
    if (params.keys.length) {
      setPlan({
        stayId: params.has("stayId") ? params.get("stayId")! : "",
        stayName: params.has("stayName") ? params.get("stayName")! : "",
        location: params.has("activityLocation")
          ? params.get("activityLocation")!
          : "",
        activities: params.has("activityName")
          ? [
              {
                id: params.get("activityId")!,
                name: params.get("activityName")!,
              },
            ]
          : [],
      });
    }
  }, [search]);

  const addNewForm = async (data: TPlanForm) => console.log(data);

  return (
    <>
      <Navbar></Navbar>
      <Container maxWidth="lg">
        <Grid container spacing={2} py={5}>
          <Grid item xs={12}>
            <Typography
              variant="h3"
              textTransform="uppercase"
              fontStyle="italic"
            >
              Create a new Plan
            </Typography>
            <Divider />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <PlanForm {...plan} onSubmit={addNewForm} />
        </Grid>
      </Container>
    </>
  );
}
