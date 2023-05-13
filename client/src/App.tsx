import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { themeAtom } from "./lib/store";
import { useAtom } from "jotai";
import { LoadingSpinner } from "./components";
import {
  ErrorPage,
  ContactUs,
  Account,
  Plan,
  Admin,
  Auth,
  Home,
  Dashboard,
  Explore,
  PlanAdd,
  PlanEdit,
} from "./pages";

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <ErrorPage /> },
  { path: "/contact-us", element: <ContactUs /> },
  { path: "/auth/login", element: <Auth type="login" /> },
  { path: "/auth/signup", element: <Auth type="signup" /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/account", element: <Account /> },
  { path: "/explore", element: <Explore /> },
  { path: "/plan/:id", element: <Plan /> },
  { path: "/plan/:id/edit", element: <PlanEdit /> },
  { path: "/plan/new", element: <PlanAdd /> },
  { path: "/admin", element: <Admin /> },
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
