import { red } from "@mui/material/colors";
import { createTheme, PaletteMode, Theme } from "@mui/material";

const getDesignTokens = (mode: PaletteMode) => ({
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

export interface CustomTheme extends Theme {
  palette: any;
  background: any;
  breakpoints: any;
}
export default function theme(mode: PaletteMode): CustomTheme {
  return createTheme(getDesignTokens(mode)) as CustomTheme;
}