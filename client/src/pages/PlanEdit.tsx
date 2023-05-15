import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Navbar } from "../components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TPlanForm } from "../lib/types";
import PlanForm from "../components/PlanForm";
import { CustomTheme } from "../lib/theme";
import { getPlanById } from "../api/plans";
import { useAtom } from "jotai";
import { loadingAtom } from "../lib/store";

export default function PlanEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useAtom(loadingAtom);
  const [plan, setPlan] = useState<TPlanForm>({ name: "" });
  const belowSmMatches = useMediaQuery((theme: CustomTheme) =>
    theme.breakpoints.down("sm")
  );

  useEffect(() => {
    setLoading(true);
    const fetchData = async (id: string) => {
      const response = await getPlanById(id);
      if (response) {
        setPlan({
          ...response,
          stay: response.stay?.id || "",
          activities: response.activities?.map((act) => act.id) || [],
        });
        setLoading(false);
      }
    };
    if (id) fetchData(id);
  }, [id]);

  const addNewForm = async (data: any) => console.log(data);

  return (
    <>
      <Navbar></Navbar>
      <Container maxWidth="lg">
        <Grid container spacing={2} py={5}>
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant={belowSmMatches ? "h4" : "h2"}
                textTransform="uppercase"
                fontStyle="italic"
              >
                Edit Plan
              </Typography>
              {plan?.id && (
                <Typography fontStyle="italic" variant="body2">
                  ID: {plan?.id ?? ""}
                </Typography>
              )}
            </Box>
            <Divider />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {!loading && <PlanForm {...plan} onSubmit={addNewForm} />}
        </Grid>
      </Container>
    </>
  );
}
