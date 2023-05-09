import { useAtom } from "jotai";
import { Backdrop, CircularProgress } from "@mui/material";
import { loadingAtom } from "../lib/store";

function LoadingSpinner() {
  const [loading] = useAtom(loadingAtom);

  if (!loading) {
    return null;
  }

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress />
    </Backdrop>
  );
}

export default LoadingSpinner;
