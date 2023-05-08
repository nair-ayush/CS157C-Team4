import { Place, SearchOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Grid,
  InputAdornment,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  DesktopDatePicker,
  LocalizationProvider,
  MobileDatePicker,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CustomTheme } from "../lib/theme";
import moment, { Moment } from "moment";
import { TSearch } from "../lib/types";

const eventFilters = [
  "Theme Parks",
  "Restaurants",
  "Sports",
  "Concerts",
  "Museums",
  "Arcades",
  "Bars",
];

interface SearchProps extends TSearch {
  onSearchSubmitCallback: (data: any) => void;
}

export default function Search(props: SearchProps) {
  const belowMdMatches = useMediaQuery((theme: CustomTheme) =>
    theme.breakpoints.down("md")
  );
  const [filters, setFilters] = useState<string[]>([]);
  const { handleSubmit, control, setValue } = useForm<TSearch>({});

  useEffect(() => {
    setValue(
      "checkInDate",
      props.checkInDate ? moment(props.checkInDate, "YYYY-MM-DD") : null
    );
    setValue(
      "checkOutDate",
      props.checkOutDate ? moment(props.checkOutDate, "YYYY-MM-DD") : null
    );
    setValue("budget", `${props.budget}`);
    setValue("location", props.location);
    setValue("numGuests", props.numGuests);
    setFilters(props.filters || []);
  }, [props, setValue]);

  const onSubmit: SubmitHandler<TSearch> = (data) => {
    data.checkInDate = (data.checkInDate as Moment)?.format("YYYY-MM-DD");
    data.checkOutDate = (data.checkOutDate as Moment)?.format("YYYY-MM-DD");
    data = { ...data, filters };
    props.onSearchSubmitCallback(data);
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
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid
          item
          xs={6}
          lg={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                label="Where"
                fullWidth
                margin="normal"
                autoComplete="location"
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Place />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>
        <Grid
          item
          xs={6}
          lg={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Controller
            name="numGuests"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                label="Guests"
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Place />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>
        <Grid
          item
          xs={6}
          lg={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Controller
            name="checkInDate"
            control={control}
            render={({ field }) => {
              return (
                <DatePicker
                  {...field}
                  label="Check In"
                  inputFormat="MM/DD/YYYY"
                  renderInput={(params) => (
                    <TextField
                      size={belowMdMatches ? "small" : undefined}
                      fullWidth
                      {...params}
                    />
                  )}
                />
              );
            }}
          />
        </Grid>
        <Grid
          item
          xs={6}
          lg={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Controller
            name="checkOutDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="Check In"
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
        <Grid
          item
          xs={6}
          lg={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography>Budget</Typography>
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
          </Box>
        </Grid>
        <Grid
          item
          xs={6}
          lg={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            endIcon={<SearchOutlined />}
          >
            Search
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          mt={2}
          display="flex"
          justifyContent="center"
          gap={1}
          flexDirection={belowMdMatches ? "column" : "row"}
          alignItems="center"
        >
          <Typography sx={{ fontStyle: "italic", fontWeight: "light" }}>
            Select events that you prefer
          </Typography>
          <Box
            gap={1}
            display={"flex"}
            flexWrap={"wrap"}
            justifyContent={"center"}
          >
            {eventFilters.map((eventType, key) => {
              return (
                <Chip
                  label={eventType}
                  color={filters.includes(eventType) ? "secondary" : "default"}
                  key={key}
                  variant="outlined"
                  onClick={() => {
                    if (filters.includes(eventType)) {
                      setFilters((prev) => {
                        prev = prev.filter((e) => e !== eventType);
                        setValue("filters", prev);
                        return prev;
                      });
                    } else
                      setFilters((prev) => {
                        prev = [...prev, eventType];
                        setValue("filters", prev);
                        return prev;
                      });
                  }}
                />
              );
            })}
          </Box>
        </Grid>
      </Grid>{" "}
    </LocalizationProvider>
  );
}
