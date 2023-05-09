import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth";
import ContactUs from "./pages/ContactUs";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Explore from "./pages/Explore";
import Plans from "./pages/Plans";
import Home from "./pages/Home";

import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import { themeAtom } from "./lib/store";
import { useAtom } from "jotai";
import { LoadingSpinner } from "./components";

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <ErrorPage /> },
  { path: "/contact-us", element: <ContactUs /> },
  { path: "/auth/login", element: <Auth type="login" /> },
  { path: "/auth/signup", element: <Auth type="signup" /> },
  { path: "/dashboard", element: <Dashboard />},
  { path: "/account", element: <Account />},
  { path: "/explore", element: <Explore />},
  { path: "/plans", element: <Plans />}
]);

const App = () => {
  const [theme] = useAtom(themeAtom);
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router}></RouterProvider>
        <LoadingSpinner />
      </ThemeProvider>
    </>
  );
};

export default App;
