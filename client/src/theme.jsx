import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#556cd6",
          },
          secondary: {
            main: "#19857b",
          },
          error: {
            main: red.A400,
          },
        }
      : {
          primary: {
            main: "#556cd6",
          },
          secondary: {
            main: "#19857b",
          },
          error: {
            main: red.A400,
          },
          // background: { default: "#121212", paper: "#121212" },
        }),
  },
});


//import { createTheme } from '@mui/material/styles';

function theme(mode) {
  const designTokens = getDesignTokens(mode);

  return createTheme(designTokens);
}

export default theme;
