import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import HomeIcon from "@mui/icons-material/Home";
import ClassIcon from "@mui/icons-material/Class";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { changeMood, setloginState, setOpenSearchDialog, setUserData } from "../../../Redux/DataSlice";
import { scroller } from "react-scroll";
import { useNavigate } from "react-router";
import SearchIcon from '@mui/icons-material/Search';
import { SearchDialog } from "../../../assets/handleErrors";


const useStyles = makeStyles({
  navbar: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    padding: "0 30px",
    alignItems: "center !important",
  },
});




const Navbar = () => {
  //View page items depend on user or guest
  const { loginState } = useSelector((state) => state.DataReducer);
  const navigate = useNavigate();
  let pages = ["Home", "Books", "Categories", "Authors"],
    settings;
  if (loginState) {
    settings = ["Profile", "Dashboard", "Logout"];
  } else {
    settings = ["Login", "Admin"];
  }

  const [anchorElUser, setAnchorElUser] = useState(null);
  //Git mode state from reduxtoolkit (DataStore)
  const { mode } = useSelector((state) => state.DataReducer);
  //Link actions with reducers
  const dispatch = useDispatch();
  const theme = useTheme();
  const drawerWidth = 240;
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  }));

  const [open, setOpen] = useState(false);
  const handleDrawerClose = (page) => {
    setOpen(false);
    if (page !== "")
      scrollToSection(page);
  };
  const handleDrawerNavigate = (page) => {
    setAnchorElUser(null);
    setOpen(false);
    page = page.toLowerCase();
    if (page === 'profile') {
      navigate(`/${page}/${sessionStorage.getItem("id")}`);
    } else if (page === 'logout') {
      dispatch(setloginState(false));
      sessionStorage.clear()
      dispatch(setUserData({}));
      // document.cookie = "Authorization=;Max-Age=0;secure"
      sessionStorage.removeItem("img");
      sessionStorage.removeItem("id");
      navigate("/");
      scrollToSection("Home")
    }
    else {
      navigate(`/${page}`);
    }
  };

  const { openSearchDialog } = useSelector((state) => state.DataReducer);
  //Go to section after click item from menu in navbar
  const scrollToSection = (page) => {
    if (document.location.href !== "http://localhost:3001/") {
      navigate("/");
    }
    page = page === "Home" ? "topPage" : page;
    scroller.scrollTo(page, {
      duration: 500,
      delay: 0,
      offset: -70,
      smooth: "easeInOutQuart",
    });
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const classes = useStyles();

  return (
    <AppBar position="sticky" className={`${classes.navbar}`}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >

            <Typography variant="span">Books</Typography>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleDrawerOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            Books
          </Typography>

          {/*Menu Items */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleDrawerClose(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {/* Mode page button */}
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="small"
              color="inherit"
              aria-label="Dark Mood"
              onClick={() => dispatch(changeMood(mode))}
            >
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Box>

          {/* Search box */}
          <IconButton
            size="small"
            sx={{ marginRight: "10px", marginLeft: "7px" }}
            color="inherit"
            aria-label="Search"
            onClick={() => dispatch(setOpenSearchDialog(true))}
          >
            <SearchIcon />
          </IconButton>


          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src={sessionStorage.getItem("img") || ""} />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleDrawerNavigate(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={() => handleDrawerClose("")}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          {openSearchDialog ? <SearchDialog /> : ""}
          <Divider />
          <List>
            {["Home", "Books", "Categories", "Authors"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index === 0 ? (
                    <HomeIcon onClick={() => handleDrawerClose("Home")} />
                  ) : index === 1 ? (
                    <MenuBookIcon onClick={() => handleDrawerClose("Books")} />
                  ) : index === 2 ? (
                    <ClassIcon onClick={() => handleDrawerClose("Categories")} />
                  ) : index === 3 ? (
                    <AccountCircleIcon onClick={() => handleDrawerClose("Authors")} />
                  ) : null}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem
              button
              key="Mode"
              onClick={() => dispatch(changeMood(mode))}
            >
              <ListItemIcon>
                {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
              </ListItemIcon>
              <ListItemText primary="Mode" />
            </ListItem>

            <ListItem button key="User">
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="User" />
            </ListItem>

            <ListItem button key="Logout">
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Drawer>
      </Container>
    </AppBar>
  );
};
export default Navbar;
