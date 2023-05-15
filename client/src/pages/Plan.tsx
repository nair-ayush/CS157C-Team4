import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
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
  AttachMoneyOutlined,
  BookmarkAdd,
  BusinessTwoTone,
  CalendarMonth,
  Check,
  DeleteForever,
  Edit,
  EventAvailable,
  EventBusy,
  Festival,
  Museum,
  OpenInNew,
  Close,
  RestaurantMenu,
} from "@mui/icons-material";
import Navbar from "../components/Navbar";
import { TPlan } from "../lib/types";
import { deletePlan, getPlanById } from "../api/plans";
import { useAtom } from "jotai";
import { loadingAtom, userAtom } from "../lib/store";
import { convertToUserDate, getRandomElement } from "../lib/util";

export default function Plan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAtom(userAtom);
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
                {plan?.name}
              </Typography>

              <img
                src={plan.imageURL}
                alt={plan.name}
                style={{ width: "100%", height: 200, objectFit: "cover" }}
              />
            </Box>
            <Grid container spacing={2} mb={5}>
              <Grid item xs={12} md={4}>
                <Card variant="outlined" sx={{ border: "none" }}>
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="h2"
                      align="center"
                      gutterBottom
                    >
                      Stay
                    </Typography>
                    <Box
                      flexDirection="column"
                      display="flex"
                      alignItems="center"
                      gap={2}
                      my={1}
                    >
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <Avatar
                          style={{
                            backgroundColor: "#f50057",
                            marginRight: "10px",
                          }}
                        >
                          <BusinessTwoTone />
                        </Avatar>
                        <Typography variant="subtitle1" component="span">
                          {plan.stay.name}
                        </Typography>
                        {plan.stay && plan.stay.name && (
                          <Link to={`/listing/${plan.stay.id}`}>
                            <OpenInNew />
                          </Link>
                        )}
                      </Box>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        {[...new Array(plan.budget)].map((_, idx) => (
                          <Avatar
                            key={idx}
                            style={{
                              backgroundColor: "green",
                              marginRight: "10px",
                            }}
                          >
                            <AttachMoneyOutlined />
                          </Avatar>
                        ))}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card variant="outlined" sx={{ border: "none" }}>
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
                        margin: "0 auto",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                      }}
                    >
                      {plan.activities.map((act) => {
                        const Icon = getRandomElement([
                          RestaurantMenu,
                          Festival,
                          Museum,
                        ]);
                        return (
                          <ListItem
                            key={act.id}
                            secondaryAction={
                              <Link to={`/activity/${act.id}`}>
                                <OpenInNew />
                              </Link>
                            }
                          >
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
              <Grid
                item
                xs={12}
                md={4}
                gap={2}
                display="flex"
                alignItems="center"
                flexDirection="column"
              >
                <Typography display="flex" alignItems="center" gap={1}>
                  <EventAvailable /> Start: {convertToUserDate(plan.startDate)}
                </Typography>
                <Typography display="flex" alignItems="center" gap={1}>
                  <EventBusy /> End: {convertToUserDate(plan.endDate)}
                </Typography>
                <Chip
                  label="Public"
                  color={plan.isPublic ? "success" : "error"}
                  icon={
                    plan.isPublic ? (
                      <Link
                        to={`/public-link/${plan.shareUrl}`}
                        style={{ pointerEvents: "none" }}
                      >
                        <Check />
                      </Link>
                    ) : (
                      <Close />
                    )
                  }
                ></Chip>
                {user && user.isLoggedIn && (
                  <Box display="flex" alignItems="center" gap={1}>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<BookmarkAdd />}
                    >
                      Save
                    </Button>
                    {user.id === plan.createdBy.id && (
                      <>
                        <Link to={`edit`}>
                          <Button
                            variant="outlined"
                            color="warning"
                            startIcon={<Edit />}
                          >
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<DeleteForever />}
                          onClick={handleDelete}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </Box>
                )}
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </>
  );
}
