import { Controller, useForm } from "react-hook-form";
import { TFActivity, TPlanForm } from "../lib/types";
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
import { getListingsByLocation } from "../api/listings";
import { getActivitiesByLocation } from "../api/activities";

interface PlanFormProps extends TPlanForm {
  onSubmit: (data: TPlanForm) => void;
}

export default function PlanForm(props: PlanFormProps) {
  const { control, handleSubmit, setValue } = useForm<TPlanForm>();
  const [activities, setActivities] = useState<TFActivity[]>([]);
  const [activityOptions, setActivityOptions] = useState<TFActivity[]>([]);
  const [listings, setListings] = useState<any[]>([]);
  const belowMdMatches = useMediaQuery((theme: CustomTheme) =>
    theme.breakpoints.down("md")
  );

  useEffect(() => {
    if (props) {
      setValue(
        "startDate",
        props.startDate ? moment(props.startDate, "YYYY-MM-DD") : null
      );
      setValue(
        "endDate",
        props.endDate ? moment(props.endDate, "YYYY-MM-DD") : null
      );
      setValue("location", props.location);
      setValue("stayId", "");
    }
  }, [props, setValue]);

  const addActivity = () => {
    if (activities.length)
      setActivities((prev) => [...prev, { id: "", name: "" }]);
    else setActivities([{ id: "", name: "" }]);
  };

  const removeActivity = (index: number) =>
    setActivities((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ]);

  const updateMetaData = async (value: string | undefined) => {
    if (value) {
      const stayResponse = await getListingsByLocation(value);
      if (stayResponse) setListings(stayResponse);
      const activityResponse = await getActivitiesByLocation(value);
      if (activityResponse) setActivityOptions(activityResponse);
    }
  };

  const DatePicker = useMemo(
    () => (belowMdMatches ? MobileDatePicker : DesktopDatePicker),
    [belowMdMatches]
  );
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Grid
        container
        spacing={2}
        component="form"
        onSubmit={handleSubmit(props.onSubmit)}
      >
        {props.id && (
          <Grid item xs={12}>
            <Typography>Plan ID: {props.id}</Typography>
          </Grid>
        )}
        <Grid item xs={12} md={4}>
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                onBlur={() => updateMetaData(field.value)}
                placeholder="Enter location..."
                label="Where"
                size={belowMdMatches ? "small" : undefined}
                fullWidth
                autoFocus
                InputProps={{ endAdornment: <LocationOn /> }}
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
        <Grid item xs={12} md={3}>
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
        </Grid>
        <Grid item xs={12} md={5}>
          <Controller
            name="stayId"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel id="form-select">Stay</InputLabel>
                <Select
                  labelId="form-select"
                  id="demo-simple-select"
                  label="Stay"
                  {...field}
                >
                  {/* {listings.length > 0 &&
                    listings.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))} */}
                  <MenuItem value={1}>Fairmont Hotel</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
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
                    {activities.length > 0 && `(${activities.length})`}
                  </Typography>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <Button startIcon={<AddBoxOutlined />} onClick={addActivity}>
                    New Activity
                  </Button>
                </Grid>
                {activities.length > 0 && (
                  <Grid item xs={12}>
                    {activities.map((act, idx) => (
                      <Box key={idx} display="flex" gap={1} py={0.5}>
                        <FormControl fullWidth>
                          <InputLabel id="form-select">Activity</InputLabel>
                          <Select
                            labelId="form-select"
                            id="demo-simple-select"
                            label="Activity"
                            size={belowMdMatches ? "small" : "medium"}
                            value={act.id}
                          >
                            {/* {activityOptions.length > 0 &&
                              activities.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                  {item.name}
                                </MenuItem>
                              ))} */}
                            <MenuItem value={1}>Concert</MenuItem>
                            <MenuItem value={2}>Museum</MenuItem>
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
                    ))}
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
            color="success"
            startIcon={<Add />}
            fullWidth
          >
            NEW PLAN
          </Button>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
