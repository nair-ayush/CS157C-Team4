import { ThemeProvider } from "@emotion/react";
import { CssBaseline, PaletteMode } from "@mui/material";
import { useState, createContext, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth";
import ContactUs from "./pages/ContactUs";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import theme from "./theme";
import { Dashboard, Explore } from "@mui/icons-material";

interface IAuthContext {
  user: IUser | null;
  updateUser: (user: IUser) => void;
}

export const ColorModeContext = createContext({ toggleColorMode: () => {} });
export const AuthContext = createContext<IAuthContext>({
  user: null,
  updateUser: (user: IUser) => {},
});

export interface IUser {
  id: string;
  name: string;
  username: string;
  token: string;
}

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <ErrorPage /> },
  { path: "/contact-us", element: <ContactUs /> },
  { path: "/auth/login", element: <Auth type="login" /> },
  { path: "/auth/signup", element: <Auth type="signup" /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/explore", element: <Explore /> },
]);

const App = () => {
  const [mode, setMode] = useState<PaletteMode>("light");
  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );
  const appTheme = useMemo(() => theme(mode), [mode]);

  return (
    <>
      <AuthContext.Provider value={{ user, updateUser }}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={appTheme}>
            <CssBaseline />
            <RouterProvider router={router}></RouterProvider>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </AuthContext.Provider>
    </>
  );
};

export default App;
