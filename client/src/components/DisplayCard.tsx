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

interface DisplayCardProps {
  label?: string;
  navigateTo?: string;
  imageURL?: string;
  budget?: string | number;
  numDays?: number;
}

const DisplayCard = ({
  label,
  navigateTo,
  imageURL,
  budget,
  numDays,
}: DisplayCardProps) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        position: "relative",
        "&:hover button": { opacity: 1 },
        "&:hover img": { filter: "blur(2px)" },
        transition: "filter 0.3s ease;",
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={imageURL}
        alt="green iguana"
      />
      <CardContent
        sx={{ display: "flex", gap: 1, justifyContent: "space-between" }}
      >
        <Typography>{label}</Typography>
        <Box display={"flex"} alignItems={"center"} gap={theme.spacing(0.5)}>
          {budget && (
            <Typography variant="subtitle2" sx={{ fontStyle: "italic" }}>
              {"$".repeat(+budget)}
            </Typography>
          )}
          {(budget || numDays) && <>&#9900;</>}
          {numDays && (
            <>
              <Typography variant="subtitle2">{numDays}</Typography>
              <Event />
            </>
          )}
        </Box>
        <Link to={navigateTo}>
          <Fab
            size="small"
            color="secondary"
            aria-label="go-to-plan"
            sx={{
              m: 1,
              position: "absolute",
              top: 0,
              right: 0,
              opacity: 0,
              zIndex: 1,
              transition: "opacity 0.2s ease",
            }}
          >
            <ArrowForwardRounded />
          </Fab>
        </Link>
      </CardContent>
    </Card>
  );
};

export default DisplayCard;
