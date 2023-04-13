import { useTheme } from "@emotion/react";
import { ArrowForwardRounded, Event } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Fab,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

/*
interface DisplayCardProps {
  label: string;
  navigateTo: string;
  imageURL: string;
  budget?: string | number;
  numDays?: number;
}
*/
const DisplayCard = ({
  label,
  navigateTo,
  imageURL,
  budget,
  numDays,
}) => {
  const theme= useTheme();
  return (
    <Box
      p={0.5}
      sx={{
        position: "relative",
        "&:hover": {
          borderColor: theme.palette.secondary.main,
        },
        "&:hover button": {
          opacity: "1",
        },
        "&:hover img": {
          filter: "blur(2px)",
        },
        border: 1.5,
        borderRadius: 1,
        borderColor:
          theme.palette.mode === "light"
            ? "white"
            : theme.palette.background.default,
        transition:
          "border 0.3s ease, border-color 0.3s ease, border-radius 0.3s ease, opacity 0.3s ease",
      }}
    >
      <Link to={navigateTo}>
        <Fab
          size="small"
          color="secondary"
          aria-label="add"
          sx={{ position: "absolute", right: 0, top: 0, m: 2, opacity: 0 }}
        >
          <ArrowForwardRounded />
        </Fab>
      </Link>
      <Card>
        <CardMedia component="img" height="140" image={imageURL} alt={label} />
      </Card>
      <Box>
        <Typography sx={{ fontWeight: "bold", fontStyle: "italic", pt: 1 }}>
          {label}
        </Typography>
        {budget && (
          <Box display={"flex"} gap={1}>
            <Typography variant="subtitle2">{"$".repeat(+budget)}</Typography>
            <Box display={"flex"}>
              <Event />
              <Typography variant="subtitle2">{numDays}</Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DisplayCard;
