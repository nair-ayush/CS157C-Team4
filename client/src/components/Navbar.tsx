import {
  useMediaQuery,
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Button,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { Adb, Brightness4, Brightness7, Lock } from "@mui/icons-material";
import { useAtom } from "jotai";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { userAtom, themeModeAtom } from "../lib/store";
import { CustomTheme } from "../lib/theme";

const pages = [
  ["Explore", "/explore"],
  ["Dashboard", "/dashboard"],
  ["Contact Us", "/contact-us"],
];
const settings = ["Account", "Logout"];

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);
  const [themeMode, setThemeMode] = useAtom(themeModeAtom);
  const belowSmMatches = useMediaQuery((theme: CustomTheme) =>
    theme.breakpoints.down("sm")
  );
  const [_, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogout = async () => {
    setUser({ id: "", name: "", isLoggedIn: false, type: "NORMAL" });
    navigate("/");
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleTheme = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Adb sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              EXPLORE MATE
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {pages.map((page, key) => {
              if (
                page[0] !== "Dashboard" ||
                (user.isLoggedIn && page[0] === "Dashboard")
              )
                return (
                  <Link
                    to={page[1]}
                    key={key}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page[0]}
                    </Button>
                  </Link>
                );
              else return;
            })}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.name || "not logged in"}>
                  {user.isLoggedIn ? (
                    user.name
                      ?.split(" ")
                      .map((stub) => stub.charAt(0).toUpperCase())
                      .join("")
                  ) : (
                    <Lock />
                  )}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="theme" onClick={toggleTheme}>
                {themeMode === "dark" ? (
                  <>
                    <Brightness7 sx={{ mr: 1 }} />
                    <Typography textAlign="center">Light Mode</Typography>
                  </>
                ) : (
                  <>
                    <Brightness4 sx={{ mr: 1 }} />
                    <Typography textAlign="center">Dark Mode</Typography>
                  </>
                )}
              </MenuItem>
              <MenuItem key="hello">
                <Link
                  to={"/account"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography textAlign={"center"}>Account</Typography>
                </Link>
              </MenuItem>
              {belowSmMatches &&
                pages.map((page, key) => {
                  if (
                    page[0] !== "Dashboard" ||
                    (user.isLoggedIn && page[0] === "Dashboard")
                  )
                    return (
                      <MenuItem key={key} onClick={handleCloseUserMenu}>
                        <Link
                          to={page[1]}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <Typography textAlign="center">{page[0]}</Typography>
                        </Link>
                      </MenuItem>
                    );
                  else return;
                })}
              {user && user.type === "NORMAL" && (
                <Link
                  to="/admin"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <MenuItem key="admin">
                    <Typography textAlign="center">Admin Portal</Typography>
                  </MenuItem>
                </Link>
              )}
              {user && user.name ? (
                <MenuItem key="logout" onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              ) : (
                <MenuItem key="login">
                  <Link
                    to={"/auth/login"}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography textAlign={"center"}>Login/Register</Typography>
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
