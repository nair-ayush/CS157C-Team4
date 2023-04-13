import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useState, createContext, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth";
import ContactUs from "./pages/ContactUs";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import theme from "./theme";
//import Account from "./pages/Account";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <ErrorPage /> },
  { path: "/contact-us", element: <ContactUs /> },
  { path: "/auth/login", element: <Auth type="login" /> },
  { path: "/auth/signup", element: <Auth type="signup" /> },
  //{ path: "/account", element: <Account /> },
]);

const App = () => {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );
  const appTheme = useMemo(() => theme(mode), [mode]);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={appTheme}>
          <CssBaseline />
          <RouterProvider router={router}></RouterProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};

export default App;
