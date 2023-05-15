import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TFActivity, TFListing, TPlanForm } from "../lib/types";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  Add,
  AddBoxOutlined,
  Close,
  Edit,
  Image,
  LocationOn,
} from "@mui/icons-material";
import {
  MobileDatePicker,
  DesktopDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { useEffect, useMemo, useState } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { CustomTheme } from "../lib/theme";
import moment from "moment";
import { listAllActivities } from "../api/activities";
import { listAllListings } from "../api/listings";
import { useAtom } from "jotai";
import { loadingAtom } from "../lib/store";

interface PlanFormProps extends TPlanForm {
  onSubmit: (data: any) => void;
}

export default function PlanForm(props: PlanFormProps) {
  const [loading, setLoading] = useAtom(loadingAtom);
  const { control, handleSubmit, setValue } = useForm<TPlanForm>();
  const [activities, setActivities] = useState<TFActivity[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [listings, setListings] = useState<TFListing[]>([]);
  const belowMdMatches = useMediaQuery((theme: CustomTheme) =>
    theme.breakpoints.down("md")
  );

  useEffect(() => {
    setLoading(true);
    if (props) {
      console.log(props.startDate);
      setValue("name", props.name ?? "");
      setValue("stay", props.stay ?? "");
      setValue("budget", `${props.budget}` ?? "");
      setValue("startDate", props.startDate ? moment(props.startDate) : null);
      setValue("endDate", props.endDate ? moment(props.endDate) : null);
      setSelectedActivities(props.activities ?? []);
    }
    const fetchData = async () => {
      const [listingsResponse, activitiesResponse] = await Promise.all([
        listAllListings(),
        listAllActivities(),
      ]);
      setListings(
        listingsResponse.map((item) => ({ id: item.id, name: item.name }))
      );
      setActivities(
        activitiesResponse.map((item) => ({ id: item.id, name: item.name }))
      );
      setLoading(false);
    };
    fetchData();
  }, []);

  const addActivity = () => {
    setSelectedActivities((prev) => [...prev, ""]);
  };

  const removeActivity = (index: number) =>
    setSelectedActivities((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ]);

  const DatePicker = useMemo(
    () => (belowMdMatches ? MobileDatePicker : DesktopDatePicker),
    [belowMdMatches]
  );

  const onFormSubmit: SubmitHandler<TPlanForm> = (data) => {
    props.onSubmit({
      ...data,
      stay: listings.find((predicate) => predicate.id === data.stay),
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Grid
        container
        spacing={2}
        component="form"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <Grid item xs={12} md={4}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Enter name..."
                label="Name"
                size={belowMdMatches ? "small" : undefined}
                fullWidth
                autoFocus
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="Start Date"
                inputFormat="MM/DD/YYYY"
                renderInput={(params) => (
                  <TextField
                    size={belowMdMatches ? "small" : undefined}
                    fullWidth
                    {...params}
                  />
                )}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="End Date"
                inputFormat="MM/DD/YYYY"
                renderInput={(params) => (
                  <TextField
                    size={belowMdMatches ? "small" : undefined}
                    fullWidth
                    {...params}
                  />
                )}
              />
            )}
          />
        </Grid>
        {/* <Grid item xs={12} md={3}>
          <Controller
            name="imageURL"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Enter image URL..."
                label="Image"
                size={belowMdMatches ? "small" : undefined}
                fullWidth
                InputProps={{ endAdornment: <Image /> }}
              />
            )}
          />
        </Grid> */}
        <Grid item xs={12} md={6}>
          <Controller
            name="stay"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel id="stay-select">Stay</InputLabel>
                <Select
                  labelId="stay-select"
                  id="stay-select-select"
                  label="Stay"
                  {...field}
                >
                  {listings.length > 0 &&
                    listings.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  {/* <MenuItem value={1}>Fairmont Hotel</MenuItem> */}
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          justifyContent="center"
          gap={2}
          alignItems="center"
        >
          <Typography>Budget:</Typography>
          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <ToggleButtonGroup
                {...field}
                exclusive
                color="primary"
                size={belowMdMatches ? "small" : undefined}
              >
                <ToggleButton
                  value="1"
                  sx={{
                    minWidth: 0,
                    maxWidth: "none",
                    width: "100%",
                    px: 1,
                  }}
                >
                  $
                </ToggleButton>
                <ToggleButton
                  value="2"
                  sx={{
                    minWidth: 0,
                    maxWidth: "none",
                    width: "100%",
                    px: 1,
                  }}
                >
                  $$
                </ToggleButton>
                <ToggleButton
                  value="3"
                  sx={{
                    minWidth: 0,
                    maxWidth: "none",
                    width: "100%",
                    px: 1,
                  }}
                >
                  $$$
                </ToggleButton>
              </ToggleButtonGroup>
            )}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Card variant="outlined">
            <CardContent>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="h5" component="h5">
                    Activities{" "}
                    {selectedActivities.length > 0 &&
                      `(${selectedActivities.length})`}
                  </Typography>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <Button startIcon={<AddBoxOutlined />} onClick={addActivity}>
                    New Activity
                  </Button>
                </Grid>
                {selectedActivities.length > 0 && (
                  <Grid item xs={12}>
                    {selectedActivities.map((act, idx) => {
                      return (
                        <Box key={idx} display="flex" gap={1} py={0.5}>
                          <FormControl fullWidth>
                            <InputLabel id="form-select">Activity</InputLabel>
                            <Select
                              labelId="form-select"
                              id="demo-simple-select"
                              label="Activity"
                              size={belowMdMatches ? "small" : "medium"}
                              value={act}
                              onChange={(e) =>
                                setSelectedActivities((prev) => {
                                  const acts = [...prev];
                                  acts[idx] = e.target.value;
                                  return acts;
                                })
                              }
                            >
                              {activities.length > 0 &&
                                activities.map((item) => (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                          <Button
                            color="error"
                            onClick={() => removeActivity(idx)}
                            size={belowMdMatches ? "small" : "medium"}
                          >
                            <Close />
                          </Button>
                        </Box>
                      );
                    })}
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            type="submit"
            variant="contained"
            color={props.id ? "warning" : "success"}
            startIcon={props.id ? <Edit /> : <Add />}
            fullWidth
          >
            {props.id ? "Edit Plan" : "New Plan"}
          </Button>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
