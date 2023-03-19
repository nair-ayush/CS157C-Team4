import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import { AuthContext, ColorModeContext } from "../App";
import * as React from "react";
import { useTheme } from "@emotion/react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useMediaQuery } from "@mui/material";
import { CustomTheme } from "../theme";
import { logout } from "../api/auth";

const pages = ["Dashboard", "Account", "Contact Us"];
const pageURLs = ["/dashboard", "/account", "/contact-us"];
const settings = ["Logout"];

function Navbar() {
  const colorMode = React.useContext(ColorModeContext);
  const { user, updateUser } = React.useContext(AuthContext);
  const theme: CustomTheme = useTheme() as CustomTheme;
  const belowMdMatches = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleLogout = async (event: React.MouseEvent<HTMLElement>) => {
    try {
      if (user) await logout(user.id);
      updateUser({ id: "", name: "", username: "", token: "" });
      setAnchorElUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            color="inherit"
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            component={Link}
            to="/"
          >
            <AdbIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={"/"}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            EXPLORE MATE
          </Typography>

          <IconButton
            color="inherit"
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            component={Link}
            to="/"
          >
            <AdbIcon />
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            EXPLORE MATE
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {pages.map((page, key) => (
              <Button
                key={page}
                to={pageURLs[key]}
                component={Link}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user ? user.name : ""}>
                  {user && user.name
                    ? user.name
                        .split(" ")
                        .map((stub) => stub[0])
                        .join("")
                    : "/"}
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
              <MenuItem key="theme" onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                  <>
                    <Brightness7Icon sx={{ mr: 1 }} />
                    <Typography textAlign="center">Light Mode</Typography>
                  </>
                ) : (
                  <>
                    <Brightness4Icon sx={{ mr: 1 }} />
                    <Typography textAlign="center">Dark Mode</Typography>
                  </>
                )}
              </MenuItem>
              {belowMdMatches &&
                pages.map((page, key) => (
                  <MenuItem
                    key={page}
                    onClick={handleCloseUserMenu}
                    component={Link}
                    to={pageURLs[key]}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              {user && user.name ? (
                <MenuItem key="logout" onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              ) : (
                <MenuItem key="login" component={Link} to={"/auth/login"}>
                  <Typography textAlign={"center"}>Login</Typography>
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
