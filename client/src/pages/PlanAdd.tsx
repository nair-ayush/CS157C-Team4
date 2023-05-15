import {
  Container,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Navbar } from "../components";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TPlanForm } from "../lib/types";
import PlanForm from "../components/PlanForm";
import { CustomTheme } from "../lib/theme";

export default function PlanAdd() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [plan, setPlan] = useState<TPlanForm>({ name: "" });
  const belowSmMatches = useMediaQuery((theme: CustomTheme) =>
    theme.breakpoints.down("sm")
  );

  useEffect(() => {
    const params = new URLSearchParams(search);
    if (params.keys.length) {
      setPlan({
        name: "",
        stay: params.has("stay") ? params.get("stay")! : "",
        activities: params.has("activity") ? [params.get("activityId")!] : [],
      });
    }
  }, [search]);

  const addNewForm = async (data: any) => console.log(data);

  return (
    <>
      <Navbar></Navbar>
      <Container maxWidth="lg">
        <Grid container spacing={2} py={5}>
          <Grid item xs={12}>
            <Typography
              variant={belowSmMatches ? "h4" : "h2"}
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
