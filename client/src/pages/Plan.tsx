import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Adb,
  BusinessTwoTone,
  DeleteForever,
  Edit,
  Festival,
  Museum,
  RestaurantMenu,
} from "@mui/icons-material";
import Navbar from "../components/Navbar";
import { TPlan } from "../lib/types";
import { deletePlan, getPlanById } from "../api/plans";
import { useAtom } from "jotai";
import { loadingAtom } from "../lib/store";

export default function Plan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useAtom(loadingAtom);
  const [plan, setPlan] = useState<TPlan>();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      if (id) {
        const response = await getPlanById(id);
        if (response) {
          setPlan(response);
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (id) await deletePlan(id);
    navigate("/dashboard");
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        {!loading && plan && (
          <>
            <Box my={4}>
              <Typography
                variant="h2"
                align="center"
                gutterBottom
                style={{ fontFamily: "Roboto", fontWeight: "light" }}
              >
                EXPLORE THE CITY
              </Typography>
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                fontStyle="italic"
              >
                {plan?.location}
              </Typography>

              <img
                src={plan.imageURL}
                alt={plan.location}
                style={{ width: "100%", height: 200, objectFit: "cover" }}
              />
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography
                          variant="h5"
                          component="h2"
                          align="center"
                          gutterBottom
                        >
                          Stay
                        </Typography>
                        <Box display="flex" alignItems="center" my={1}>
                          <Avatar
                            style={{
                              backgroundColor: "#f50057",
                              marginRight: "10px",
                            }}
                          >
                            <BusinessTwoTone />
                          </Avatar>
                          <Typography variant="subtitle1" component="span">
                            {plan.stayName} - {"$".repeat(plan.budget)}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography
                          variant="h5"
                          component="h2"
                          align="center"
                          gutterBottom
                        >
                          Entertaining Activities
                        </Typography>
                        <List
                          sx={{
                            width: "100%",
                            maxWidth: 360,
                            bgcolor: "background.paper",
                          }}
                        >
                          {plan.activities.map((act) => {
                            const icons = [RestaurantMenu, Festival, Museum];
                            const randomIndex = Math.floor(
                              Math.random() * icons.length
                            );
                            const Icon = icons[randomIndex];
                            return (
                              <ListItem key={act.id}>
                                <ListItemAvatar>
                                  <Avatar sx={{ backgroundColor: "#3f51b5" }}>
                                    <Icon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={act.name} />
                              </ListItem>
                            );
                          })}
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                gap={4}
                display="flex"
                flexDirection="column"
              >
                <Link to={`edit`}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="warning"
                    startIcon={<Edit />}
                  >
                    Edit Plan
                  </Button>
                </Link>
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteForever />}
                  onClick={handleDelete}
                >
                  Delete Plan
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </>
  );
}
